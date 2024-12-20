import { supabase } from '../supabase';

export async function uploadProductImage(file: File) {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product_images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('product_images')
      .getPublicUrl(filePath);

    return {
      url: publicUrl,
      path: filePath,
      name: fileName
    };
  } catch (error) {
    console.error('Error uploading product image:', error);
    throw error;
  }
}