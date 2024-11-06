<x-app-layout>
    <div>
        <x-slot name="header">
            <div class="section-header">
                <h1> Edit Product</h1>
            </div>
        </x-slot>
        <div class="card">
            <div class="card-header">
                <x-primary-button onclick="window.location='{{ url('/product') }}'"> <i
                        class="fas fa-arrow-left "></i></x-primary-button>
            </div>
            <div class="card-body">
                <form method="post" action="{{ route('product.update', $product->id) }}" enctype="multipart/form-data">
                    @method('PATCH')
                    @csrf
                    <div class="form-row">
                        <div class="form-group  col-md-6">
                            <x-input-label for="name">Name</x-input-label>
                            <x-text-input type="text" id="name" name="name" value="{{ $product->name }}" />
                            @error('name')
                                <span class="text-danger" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                        <div class="form-group col-md-6">
                            <x-input-label for="category"> Category Name</x-input-label>
                            <select type="text" id="category" name="category" class="form-control">
                                <option value="{{$product->category }}">{{$product->category }}</option>
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
                        <textarea name="description" class="form-control" id="description"
                            rows="4">{{ $product->description }}</textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <x-input-label for="actual_price">Actual Price</x-input-label>
                            <x-text-input type="number" id="actual_price" name="actual_price"
                                value="{{ $product->actual_price }}" />
                            @error('actual_price')
                                <span class="text-danger" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                        <div class="form-group col-md-6">
                            <x-input-label for="discount_price"> Discount Price</x-input-label>
                            <x-text-input type="number" id="discount_price" name="discount_price"
                                value="{{ $product->discount_price }}" />
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
                                        <th scope="col" width="0.2%"></th>
                                        <th scope="col">Size</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col" width="5%">Action</th>
                                    </tr>
                                </thead>
                                <tbody id="variants-container">
                                    @if($product->variants)
                                        @foreach($product->variants as $index => $variant)
                                            <tr>
                                                <td> <input type="hidden" name="variants[{{ $index }}][id]"
                                                        value="{{ $variant->id }}"></td>
                                                <td> <input type="text" name="variants[{{$index}}][options][0][attribute_name]"
                                                        class="form-control" placeholder="Size"
                                                        value="{{ $variant->attribute_name }}"></td>
                                                <td> <input type="number"
                                                        name="variants[{{$index}}][options][0][attribute_value]"
                                                        placeholder="No of Quantity" class="form-control"
                                                        value="{{ $variant->attribute_value }}"></td>
                                                @if($index > 0)
                                                    <td>
                                                        <button class="btn btn-sm btn-link delete-variantDB"
                                                            data-id="{{ $variant->id }}" type="button" name="deleting"
                                                            data-toggle="tooltip" data-placement="top" title="Delete"> <i
                                                                class="fas fa-trash text-danger"></i>
                                                        </button>
                                                </td> @endif
                                            </tr>
                                        @endforeach
                                    @endif
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="form-group">
                        @if(count($product->uploadImage) > 0)
                            <x-input-label> Uploaded Images</x-input-label>
                            <div class="d-flex flex-row">
                                @foreach($product->uploadImage as $image)
                                    <div class="ml-5" style="width:max-content">
                                        <img src="{{ asset($image->url) }}" width="100" height="100" alt="">
                                        <button class="position-absolute bottom-0 btn btn-sm btn-link delete-image"
                                            data-toggle="tooltip" data-placement="top" title="Delete" data-id="{{ $image->id }}"
                                            name="deleting">
                                            <i class="fas fa-trash text-danger"></i>
                                        </button>
                                    </div>
                                @endforeach
                            </div>
                        @endif
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
                     <td> <input type="hidden" name="variants[${variantIndex}][id]" value=""></td>
                        <td >
                            <input type="text" name="variants[${variantIndex}][options][0][attribute_name]" class="form-control" placeholder="Size">
                        </td>
                         <td >
                            <input type="number" name="variants[${variantIndex}][options][0][attribute_value]" class="form-control" placeholder="No of Quantity">
                        </td>
                                 <td>
                        <button type="button" id="delete-variant" class="btn btn-sm btn-link delete-variant" data-index="${variantIndex}" data-toggle="tooltip"
                                                    data-placement="top" title="Delete"> <i class="fas fa-trash text-danger delete-variant" data-index="${variantIndex}"></i></button>      </td>
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

    document.querySelectorAll('.delete-image').forEach(button => {
        button.addEventListener('click', function () {
            var id = this.getAttribute("data-id");
            $.ajax({
                url: "image/" + id,
                type: 'DELETE',
                headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
                data: {
                    id: id
                },
                success: function (data) {
                    alert(data['success']);
                    location.reload(true);
                }
            });
        });
    });
    document.querySelectorAll('.delete-variantDB').forEach(button => {
        button.addEventListener('click', function () {
            var id = this.getAttribute("data-id");

            $.ajax({
                url: "variant/" + id,
                type: 'DELETE',
                headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
                data: {
                    id: id
                },
                success: function (data) {
                    alert(data['success']);
                    location.reload(true);
                }
            });
        });
    });
</script>