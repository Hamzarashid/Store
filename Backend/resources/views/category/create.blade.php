<x-app-layout>
    <div>
        <x-slot name="header">
            <div class="section-header">
                <h1> Create Category</h1>
            </div>
        </x-slot>
        <div class="card">
            <div class="card-header">
                <x-primary-button onclick="window.location='{{ url('/category') }}'"> <i
                        class="fas fa-arrow-left "></i></x-primary-button>
            </div>
            <div class="card-body">
                <x-auth-validation-errors class="mb-4" :errors="$errors" />
                <form action="{{ route('category.store') }}" method="POST">
                    @csrf
                    <div class="form-group">
                        <x-input-label for="Name">Category Name</x-input-label>
                        <x-text-input type="text" id="Name" name="Name" />
                    </div>
                    <x-primary-button>Submit</x-primary-button>
                </form>
            </div>
        </div>
    </div>
</x-app-layout>