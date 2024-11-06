<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;

use App\Models\Image;

class ImageController extends Controller
{
    public function destroy($product_id, $id)
    {
        $image = Image::findOrFail($id);
        $imagePath = public_path($image->url);
        $image->delete();

        if (File::exists($imagePath)) {

            File::delete($imagePath);
        }

        return response()->json(['success' => 'Image deleted successfully.']);
    }
}
