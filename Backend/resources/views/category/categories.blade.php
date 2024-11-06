<x-app-layout>
    <div>
        @include('utilities.alerts')
        <x-slot name="header">
            <div class="section-header">
                <h1>Categories</h1>
            </div>
        </x-slot>

        <div class="card">
            <div class="card-header">
                <x-primary-button onclick="window.location='{{ route('category.create') }}'">Add <i
                        class="fas fa-plus fa-xs "></i></x-primary-button>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col" width="5%">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php
                                $i = 0;
                            @endphp
                            @foreach ($categories as $category)
                                <tr>
                                    <th>{{ ++$i}}</th>
                                    <td>{{ $category->name }}</td>
                                    <td>
                                        <div class="d-flex">
                                            <button class="btn btn-sm btn-link" data-toggle="tooltip" data-placement="top"
                                                title="Edit"
                                                onclick="window.location='{{ route('category.edit', $category->id) }}'">
                                                <i class="fas fa-edit text-info"></i>
                                            </button>
                                            <form action="{{ route('category.destroy', $category->id) }}" method="POST">
                                                @csrf
                                                @method('DELETE')
                                                <button class="btn btn-sm btn-link" data-toggle="tooltip"
                                                    data-placement="top" title="Delete">
                                                    <i class="fas fa-trash text-danger"></i>
                                                </button>
                                            </form>

                                        </div>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
                <div class="d-flex justify-content-center">
                    {{ $categories->links('pagination::bootstrap-4') }}
                </div>
            </div>
        </div>
    </div>
</x-app-layout>