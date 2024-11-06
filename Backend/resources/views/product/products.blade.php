<x-app-layout>
    <div>
        @include('utilities.alerts')
        <x-slot name="header">
            <div class="section-header">
                <h1>Products</h1>
            </div>
        </x-slot>

        <div class="card">
            <div class="card-header justify-content-between">
                <x-primary-button onclick="window.location='{{ route('product.create') }}'">Add <i
                        class="fas fa-plus fa-xs "></i></x-primary-button>
                <div class="input-group w-25">
                    <input type="text" id="search" class="form-control" placeholder="Search products..."
                        value="{{ request()->input('search') }}">
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Category Name</th>
                                <th scope="col">Actual Price</th>
                                <th scope="col">Discount price</th>
                                <th scope="col"></th>
                                <th scope="col" width="5%">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php
                                $i = ($products->currentPage() - 1) * $products->perPage();
                            @endphp
                            @foreach ($products as $product)
                                <tr>
                                    <th>{{ ++$i }}</th>
                                    <td>{{ $product->name }}</td>
                                    <td class="text-truncate" style="max-width: 300px;">
                                        {{ $product->description }}
                                    </td>
                                    <td>{{ $product->category }}</td>
                                    <td>{{ $product->actual_price }}</td>
                                    <td>{{ $product->discount_price ?? "-" }}</td>
                                    <td>
                                        @if(count($product->uploadImage) > 0)
                                            <div class="flex gap-2">
                                                <img src="{{ asset($product->uploadImage[0]->url) }}" width="50" height="50"
                                                    alt="">
                                            </div>
                                        @endif
                                    </td>
                                    <td>
                                        <div class="d-flex">
                                            <button class="btn btn-sm btn-link" data-toggle="tooltip" data-placement="top"
                                                title="Edit"
                                                onclick="window.location='{{ route('product.edit', $product->id) }}'">
                                                <i class="fas fa-edit text-info"></i>
                                            </button>
                                            <form action="{{ route('product.destroy', $product->id) }}" method="POST">
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
                    {{ $products->appends(['search' => request()->input('search')])->links('pagination::bootstrap-4') }}
                </div>
            </div>
        </div>
    </div>

    <script>
        // Debounce function to limit the rate at which the search function is called
        function debounce(func, wait) {
            let timeout;
            return function (...args) {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), wait);
            };
        }

        document.getElementById('search').addEventListener('input', debounce(function (e) {
            const searchValue = e.target.value;
            const url = new URL(window.location.href);
            url.searchParams.set('search', searchValue);
            window.location.href = url.toString();
        }, 500)); // 500ms debounce time
    </script>
</x-app-layout>