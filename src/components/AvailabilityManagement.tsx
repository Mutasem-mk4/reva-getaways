import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JollyCalendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Check, X } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
import { supabase } from '@/integrations/supabase/client';

interface AvailabilityRecord {
  id: string;
  farm_id: string;
  date: string;
  is_available: boolean;
}

interface AvailabilityManagementProps {
  farmId: string;
  farmName: string;
}

export function AvailabilityManagement({ farmId, farmName }: AvailabilityManagementProps) {
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date } | null>(null);
  const [availability, setAvailability] = useState<AvailabilityRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAvailability();
  }, [farmId]);

  const fetchAvailability = async () => {
    try {
      const { data, error } = await supabase
        .from('farm_availability')
        .select('*')
        .eq('farm_id', farmId)
        .order('date', { ascending: true });

      if (error) throw error;
      setAvailability(data || []);
    } catch (error) {
      console.error('Error fetching availability:', error);
      toast({
        title: "Error",
        description: "Failed to load availability data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateDateRange = () => {
    if (!dateRange) return [];
    
    const dates = [];
    const current = new Date(dateRange.start);
    const end = new Date(dateRange.end);
    
    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return dates;
  };

  const markDatesAvailable = async (isAvailable: boolean) => {
    const datesToMark = dateRange ? generateDateRange() : (selectedDate ? [new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day)] : []);
    
    if (datesToMark.length === 0) {
      toast({
        title: "No dates selected",
        description: "Please select a date or date range first",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      for (const date of datesToMark) {
        const dateStr = format(date, 'yyyy-MM-dd');
        
        // Check if record exists
        const existingRecord = availability.find(a => a.date === dateStr);
        
        if (existingRecord) {
          // Update existing record
          const { error } = await supabase
            .from('farm_availability')
            .update({ is_available: isAvailable })
            .eq('id', existingRecord.id);
          
          if (error) throw error;
        } else {
          // Create new record
          const { error } = await supabase
            .from('farm_availability')
            .insert({
              farm_id: farmId,
              date: dateStr,
              is_available: isAvailable
            });
          
          if (error) throw error;
        }
      }

      toast({
        title: "Success",
        description: `${datesToMark.length} date(s) marked as ${isAvailable ? 'available' : 'unavailable'}`,
      });

      setSelectedDate(null);
      setDateRange(null);
      fetchAvailability();
    } catch (error) {
      console.error('Error updating availability:', error);
      toast({
        title: "Error",
        description: "Failed to update availability",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const getDateStatus = (calendarDate: CalendarDate) => {
    const date = new Date(calendarDate.year, calendarDate.month - 1, calendarDate.day);
    const dateStr = format(date, 'yyyy-MM-dd');
    const record = availability.find(a => a.date === dateStr);
    return record?.is_available;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Availability for {farmName}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <JollyCalendar
                value={selectedDate}
                onChange={setSelectedDate}
                minValue={today(getLocalTimeZone())}
                className="border rounded-md p-3"
              />
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-4">Date Range Selection</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Start Date</label>
                    <input
                      type="date"
                      className="w-full mt-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      onChange={(e) => {
                        if (e.target.value) {
                          const startDate = new Date(e.target.value);
                          setDateRange(prev => ({ 
                            start: startDate, 
                            end: prev?.end || addDays(startDate, 0)
                          }));
                        }
                      }}
                      disabled={saving}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">End Date</label>
                    <input
                      type="date"
                      className="w-full mt-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      onChange={(e) => {
                        if (e.target.value) {
                          const endDate = new Date(e.target.value);
                          setDateRange(prev => ({
                            start: prev?.start || endDate,
                            end: endDate
                          }));
                        }
                      }}
                      disabled={saving}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Selected</h3>
                {selectedDate ? (
                  <div className="p-2 border rounded">
                    <span>Single: {format(new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day), 'MMM dd, yyyy')}</span>
                  </div>
                ) : dateRange ? (
                  <div className="p-2 border rounded">
                    <span>Range: {format(dateRange.start, 'MMM dd')} - {format(dateRange.end, 'MMM dd, yyyy')}</span>
                    <div className="text-sm text-foreground-secondary">
                      {generateDateRange().length} days
                    </div>
                  </div>
                ) : (
                  <p className="text-foreground-secondary">No dates selected</p>
                )}
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={() => markDatesAvailable(true)} 
                  disabled={(!selectedDate && !dateRange) || saving}
                  className="w-full"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Mark Available
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => markDatesAvailable(false)} 
                  disabled={(!selectedDate && !dateRange) || saving}
                  className="w-full"
                >
                  <X className="w-4 h-4 mr-2" />
                  Mark Unavailable
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-success rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-destructive rounded"></div>
              <span>Unavailable</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border rounded"></div>
              <span>Not set</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}