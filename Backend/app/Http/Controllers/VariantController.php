<?php

namespace App\Http\Controllers;

use App\Models\Variant;

class VariantController extends Controller
{
    public function destroy($product_id, $id)
    {
        $image = Variant::findOrFail($id);
        $image->delete();

        return response()->json(['success' => 'Variant deleted successfully.']);
    }
}
