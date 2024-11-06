<x-app-layout>
    <div>
        <x-slot name="header">
            <div class="section-header">
                <h1> Edit Category</h1>
            </div>
        </x-slot>
        <div class="card">
            <div class="card-header">
                <x-primary-button onclick="window.location='{{ url('/category') }}'"> <i
                        class="fas fa-arrow-left "></i></x-primary-button>
            </div>
            <div class="card-body">
                <x-auth-validation-errors class="mb-4" :errors="$errors" />
                <form method="post" action="{{ route('category.update', $category->id) }}">
                    @method('PATCH')
                    @csrf
                    <div class="form-group">
                        <x-input-label for="Name">Category Name</x-input-label>
                        <x-text-input type="text" id="Name" name="Name" value="{{ $category->name }}" />
                    </div>
                    <x-primary-button>Submit</x-primary-button>
                </form>
            </div>
        </div>
    </div>
</x-app-layout>