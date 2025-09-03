import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { LogOut, Plus, Settings, Calendar, Image, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';

interface Farm {
  id: string;
  name: string;
  description: string | null;
  location: string | null;
  price_per_night: number | null;
  guests: number;
  bedrooms: number;
  rating: number;
  review_count: number;
  created_at: string;
}

export function Dashboard() {
  const { user, profile, loading, signOut, isAdmin } = useAuth();
  const [farms, setFarms] = useState<Farm[]>([]);
  const [farmStats, setFarmStats] = useState({ total: 0, available: 0 });
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (user && profile) {
      fetchFarms();
    }
  }, [user, profile]);

  const fetchFarms = async () => {
    try {
      let query = supabase.from('farms').select('*');
      
      // If not admin, only show user's farms
      if (!isAdmin()) {
        query = query.eq('owner_id', user?.id);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      
      setFarms(data || []);
      setFarmStats({
        total: data?.length || 0,
        available: data?.length || 0 // For now, assuming all are available
      });
    } catch (error) {
      console.error('Error fetching farms:', error);
    } finally {
      setLoadingData(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface-subtle to-surface-muted">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {profile?.full_name || 'User'}!
            </h1>
            <p className="text-foreground-secondary mt-1">
              {isAdmin() ? 'System Administrator' : 'Farm Owner'} Dashboard
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={isAdmin() ? 'destructive' : 'secondary'}>
              {profile?.role === 'admin' ? 'Admin' : 'Farm Owner'}
            </Badge>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isAdmin() ? 'Total Farms' : 'My Farms'}
              </CardTitle>
              <Settings className="h-4 w-4 text-foreground-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{farmStats.total}</div>
              <p className="text-xs text-foreground-secondary">
                Active properties
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
              <Calendar className="h-4 w-4 text-foreground-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{farmStats.available}</div>
              <p className="text-xs text-foreground-secondary">
                Ready for booking
              </p>
            </CardContent>
          </Card>

          {isAdmin() && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-foreground-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">-</div>
                <p className="text-xs text-foreground-secondary">
                  System users
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="farms" className="space-y-6">
          <TabsList>
            <TabsTrigger value="farms">
              <Settings className="w-4 h-4 mr-2" />
              {isAdmin() ? 'All Farms' : 'My Farms'}
            </TabsTrigger>
            <TabsTrigger value="availability">
              <Calendar className="w-4 h-4 mr-2" />
              Availability
            </TabsTrigger>
            <TabsTrigger value="images">
              <Image className="w-4 h-4 mr-2" />
              Images
            </TabsTrigger>
            {isAdmin() && (
              <TabsTrigger value="admin">
                <Users className="w-4 h-4 mr-2" />
                Admin Panel
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="farms" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Farm Management</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add New Farm
              </Button>
            </div>

            {loadingData ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              </div>
            ) : farms.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Settings className="h-16 w-16 text-foreground-secondary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Farms Yet</h3>
                  <p className="text-foreground-secondary text-center mb-6 max-w-md">
                    {isAdmin() 
                      ? 'No farms have been registered in the system yet.'
                      : 'You haven\'t added any farms yet. Start by adding your first farm property.'
                    }
                  </p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Farm
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {farms.map((farm) => (
                  <Card key={farm.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{farm.name}</CardTitle>
                        <Badge variant="outline">
                          ${farm.price_per_night}/night
                        </Badge>
                      </div>
                      <CardDescription>
                        {farm.location} • {farm.guests} guests • {farm.bedrooms} bedrooms
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground-secondary mb-4">
                        {farm.description || 'No description available'}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-foreground-secondary">
                          <span>Rating: {farm.rating}/5</span>
                          <span>{farm.review_count} reviews</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Manage Images
                          </Button>
                          <Button variant="outline" size="sm">
                            Availability
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="availability">
            <Card>
              <CardHeader>
                <CardTitle>Availability Calendar</CardTitle>
                <CardDescription>
                  Manage when your farms are available for booking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-16">
                  <Calendar className="h-16 w-16 text-foreground-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Calendar Coming Soon</h3>
                  <p className="text-foreground-secondary">
                    The availability management calendar will be implemented here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images">
            <Card>
              <CardHeader>
                <CardTitle>Image Management</CardTitle>
                <CardDescription>
                  Upload and manage farm images
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-16">
                  <Image className="h-16 w-16 text-foreground-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Image Gallery Coming Soon</h3>
                  <p className="text-foreground-secondary">
                    Farm image upload and management will be implemented here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {isAdmin() && (
            <TabsContent value="admin">
              <Card>
                <CardHeader>
                  <CardTitle>System Administration</CardTitle>
                  <CardDescription>
                    Manage users, farms, and system settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-16">
                    <Users className="h-16 w-16 text-foreground-secondary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Admin Panel Coming Soon</h3>
                    <p className="text-foreground-secondary">
                      Advanced admin features will be implemented here.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}