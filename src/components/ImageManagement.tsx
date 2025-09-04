import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, Trash2, Star, StarOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface FarmImage {
  id: string;
  image_url: string;
  is_primary: boolean;
  created_at: string;
}

interface ImageManagementProps {
  farmId: string;
  farmName: string;
}

export function ImageManagement({ farmId, farmName }: ImageManagementProps) {
  const [images, setImages] = useState<FarmImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchImages();
  }, [farmId]);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('farm_images')
        .select('*')
        .eq('farm_id', farmId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
      toast({
        title: "Error",
        description: "Failed to load images",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${farmId}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('farm-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('farm-images')
        .getPublicUrl(fileName);

      const { error: dbError } = await supabase
        .from('farm_images')
        .insert({
          farm_id: farmId,
          image_url: publicUrl,
          is_primary: images.length === 0
        });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });

      fetchImages();
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (imageId: string, imageUrl: string) => {
    try {
      const { error } = await supabase
        .from('farm_images')
        .delete()
        .eq('id', imageId);

      if (error) throw error;

      // Extract file path from URL for storage deletion
      const urlParts = imageUrl.split('/');
      const fileName = urlParts.slice(-2).join('/');
      
      await supabase.storage
        .from('farm-images')
        .remove([fileName]);

      toast({
        title: "Success",
        description: "Image deleted successfully",
      });

      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive",
      });
    }
  };

  const setPrimaryImage = async (imageId: string) => {
    try {
      // First, set all images as non-primary
      await supabase
        .from('farm_images')
        .update({ is_primary: false })
        .eq('farm_id', farmId);

      // Then set the selected image as primary
      const { error } = await supabase
        .from('farm_images')
        .update({ is_primary: true })
        .eq('id', imageId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Primary image updated",
      });

      fetchImages();
    } catch (error) {
      console.error('Error updating primary image:', error);
      toast({
        title: "Error",
        description: "Failed to update primary image",
        variant: "destructive",
      });
    }
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
          <CardTitle>Upload Images for {farmName}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
              disabled={uploading}
            />
            <label htmlFor="image-upload">
              <Button asChild disabled={uploading}>
                <span className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </span>
              </Button>
            </label>
          </div>
        </CardContent>
      </Card>

      {images.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <Upload className="h-16 w-16 text-foreground-secondary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Images Yet</h3>
            <p className="text-foreground-secondary">Upload your first image to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <div className="relative aspect-square">
                <img
                  src={image.image_url}
                  alt="Farm image"
                  className="w-full h-full object-cover"
                />
                {image.is_primary && (
                  <Badge className="absolute top-2 left-2" variant="default">
                    Primary
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPrimaryImage(image.id)}
                    disabled={image.is_primary}
                  >
                    {image.is_primary ? (
                      <Star className="w-4 h-4 mr-2 fill-current" />
                    ) : (
                      <StarOff className="w-4 h-4 mr-2" />
                    )}
                    {image.is_primary ? 'Primary' : 'Set Primary'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteImage(image.id, image.image_url)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}