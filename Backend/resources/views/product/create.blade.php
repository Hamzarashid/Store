<x-app-layout>
    <div>
        <x-slot name="header">
            <div class="section-header">
                <h1> Create Product</h1>
            </div>
        </x-slot>
        <div class="card">
            <div class="card-header">
                <x-primary-button onclick="window.location='{{ url('/product') }}'"> <i
                        class="fas fa-arrow-left "></i></x-primary-button>
            </div>
            <div class="card-body">
                <form action="{{ route('product.store') }}" method="POST">
                    @csrf
                    <div class="form-row">
                        <div class="form-group  col-md-6">
                            <x-input-label for="name">Name</x-input-label>
                            <x-text-input type="text" id="name" name="name" />
                            @error('name')
                                <span class="text-danger" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                        <div class="form-group col-md-6">
                            <x-input-label for="category"> Category Name</x-input-label>
                            <select type="text" id="category" name="category" class="form-control">
                                <option value="">--Select--</option>
                                @foreach ($categories as $category)
                                    <option value="{{ $category->name }}">{{ $category->name }}</option>
                                @endforeach
                            </select>
                            @error('category')
                                <span class="text-danger" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                    </div>
                    <div class="form-group">
                        <x-input-label for="description"> Description</x-input-label>
                        <textarea name="description" class="form-control" id="description" rows="4"></textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <x-input-label for="actual_price">Actual Price</x-input-label>
                            <x-text-input type="number" id="actual_price" name="actual_price" />
                            @error('actual_price')
                                <span class="text-danger" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                        <div class="form-group col-md-6">
                            <x-input-label for="discount_price"> Discount Price</x-input-label>
                            <x-text-input type="number" id="discount_price" name="discount_price" />
                        </div>
                    </div>
                    <h4 class="pt-6">Variants <x-primary-button id="add-variant" type="button"> <i
                                class="fas fa-plus "></i></x-primary-button></h4>
                    @error('variants.*.options.*.attribute_name' ?? 'variants.*.options.*.attribute_value')
                        <span class="text-danger" role="alert">
                            <strong>{{"variants field required"}}</strong>
                        </span>
                    @enderror
                    <div class="form-row">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Size</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col" width="5%">Action</th>
                                    </tr>
                                </thead>
                                <tbody id="variants-container">
                                    <tr>
                                        <td> <input type="text" name="variants[0][options][0][attribute_name]"
                                                class="form-control" placeholder="Size"></td>
                                        <td> <input type="number" name="variants[0][options][0][attribute_value]"
                                                placeholder="No of Quantity" class="form-control"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="form-group">
                        <x-input-label for="images" class="form-label"> Upload Images</x-input-label>
                        <input class="form-control" type="file" name="images[]" id="images" accept="image/*" multiple>
                    </div>
                    <x-primary-button type="submit">Submit</x-primary-button>
                </form>
            </div>
        </div>
    </div>
</x-app-layout>

<script>
    let variantIndex = 1;

    document.getElementById('add-variant').addEventListener('click', function () {
        let variantTemplate = `
                    <tr id="variant-${variantIndex}">
                        <td >
                            <input type="text" name="variants[${variantIndex}][options][0][attribute_name]" class="form-control" placeholder="Size">
                        </td>
                         <td >
                            <input type="number" name="variants[${variantIndex}][options][0][attribute_value]" class="form-control" placeholder="No of Quantity">
                        </td>
                        <td>
                        <button id="delete-variant" class="btn btn-sm btn-link" data-index="${variantIndex}" data-toggle="tooltip"
                                                    data-placement="top" title="Delete"> <i class="fas fa-trash text-danger delete-variant" data-index="${variantIndex}"></i></button>     
                        </td>
                                                
                    </tr>
                `;
        document.getElementById('variants-container').insertAdjacentHTML('beforeend', variantTemplate);
        variantIndex++;
    });
    document.getElementById('variants-container').addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('delete-variant')) {
            const index = event.target.getAttribute('data-index');
            document.getElementById(`variant-${index}`).remove();
        }
    });
</script>