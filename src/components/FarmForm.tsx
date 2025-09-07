import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface FarmFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function FarmForm({ open, onClose, onSuccess }: FarmFormProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    contact_email: '',
    price_per_night: '',
    guests: '1',
    bedrooms: '1'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('farms')
        .insert({
          name: formData.name,
          description: formData.description || null,
          location: formData.location || null,
          contact_email: formData.contact_email || null,
          price_per_night: formData.price_per_night ? parseFloat(formData.price_per_night) : null,
          guests: parseInt(formData.guests),
          bedrooms: parseInt(formData.bedrooms),
          owner_id: user.id
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Farm added successfully.",
      });

      setFormData({
        name: '',
        description: '',
        location: '',
        contact_email: '',
        price_per_night: '',
        guests: '1',
        bedrooms: '1'
      });
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error adding farm:', error);
      toast({
        title: "Error",
        description: "Failed to add farm. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Farm</DialogTitle>
          <DialogDescription>
            Add a new farm property to your portfolio.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Farm Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter farm name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contact_email">Contact Email</Label>
            <Input
              id="contact_email"
              name="contact_email"
              type="email"
              value={formData.contact_email}
              onChange={handleChange}
              placeholder="Contact email for guests"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your farm property"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="guests">Max Guests</Label>
              <Input
                id="guests"
                name="guests"
                type="number"
                min="1"
                value={formData.guests}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input
                id="bedrooms"
                name="bedrooms"
                type="number"
                min="1"
                value={formData.bedrooms}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price_per_night">Price per Night ($)</Label>
            <Input
              id="price_per_night"
              name="price_per_night"
              type="number"
              min="0"
              step="0.01"
              value={formData.price_per_night}
              onChange={handleChange}
              placeholder="0.00"
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !formData.name}>
              {loading ? 'Adding...' : 'Add Farm'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}