<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::paginate(10);
        return view('category.categories', compact('categories', 'categories'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('category.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'Name' => 'required',
        ]);

        $category = new Category([
            'name' => $request->get('Name'),
        ]);

        $category->save();
        return redirect('/category')->with('success', 'Category has been added');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return view('category.view', compact('category'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return view('category.edit', compact('category'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'Name' => 'required',
        ]);


        $category = Category::find($id);
        $category->name = $request->get('Name');

        $category->update();

        return redirect('/category')->with('success', 'Category updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return redirect('/category')->with('success', 'Category deleted successfully');
    }

}
