<x-app-layout>
    <div>
        @include('utilities.alerts')
        <x-slot name="header">
            <div class="section-header">
                <h1>Orders</h1>
            </div>
        </x-slot>

        <div class="card">
            <div class="card-header">
                <h4>Customers</h4>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Customer Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Address</th>
                                <th scope="col">City</th>
                                <th scope="col">Phone no</th>
                                <th scope="col">Status</th>
                                <th scope="col" width="5%">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php
                                $i = 0;
                            @endphp
                            @foreach ($customers as $customer)
                                <tr>
                                    <th>{{ ++$i}}</th>
                                    <td>{{ $customer->name }}</td>
                                    <td>{{ $customer->email }}</td>
                                    <td>{{ $customer->address }}</td>
                                    <td>{{ $customer->city }}</td>
                                    <td>{{ $customer->phone_no }}</td>
                                    <td>
                                        <div class="btn-group">
                                            <button type="button"
                                                class="btn {{ $customer->status == 'Pending' ? 'btn-info' : ($customer->status == 'In-Progress' ? 'btn-warning' : 'btn-success') }} dropdown-toggle"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {{ $customer->status }}
                                            </button>
                                            <div class="dropdown-menu">
                                                <a class="dropdown-item" href="#"
                                                    onclick="updateStatus('Pending', {{$customer->id}})">Pending</a>
                                                <a class="dropdown-item" href="#"
                                                    onclick="updateStatus('In-Progress', {{$customer->id}})">In-Progress</a>
                                                <a class="dropdown-item" href="#"
                                                    onclick="updateStatus('Delivered', {{$customer->id}})">Delivered</a>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="d-flex">
                                            <button class="btn btn-sm btn-link view-orders"
                                                data-customer-id="{{ $customer->id }}" data-toggle="tooltip"
                                                data-placement="top" title="View Order">
                                                <i class="fas fa-eye text-info"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
                <div class="d-flex justify-content-center">
                    {{ $customers->links('pagination::bootstrap-4') }}
                </div>
            </div>
        </div>
        <div id="orders" class="customer-orders d-none">
            <div class="card">
                <div class="card-header">
                    <h4>Customer orders</h4>
                </div>
                <div class="card-body">
                <h6 id="order-number" class="text-muted"></h6> 
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Size</th>
                                    <th scope="col">Quanitty</th>
                                </tr>
                            </thead>
                            <tbody id="order-list">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>

<script>
    document.querySelectorAll('.view-orders').forEach(button => {
        button.addEventListener('click', function () {
            const customerId = this.getAttribute('data-customer-id');
            const orderList = $('#order-list');
            const orderNumberElement = $('#order-number');
            const order = $('#orders');

            if (order.hasClass('d-none') || order.data('currentCustomer') !== customerId) {
                orderList.empty(); 
                orderNumberElement.text(''); 

                $.ajax({
                    url: '/api/order/' + customerId,
                    method: 'GET',
                    success: function (data) {
                        let orderItems = '';
                        if (data.length > 0) {
                            orderNumberElement.text(`Order Number: ${data[0].order_number || 'N/A'}`);

                            $.each(data, function (index, order) {
                                orderItems += `
                                    <tr>
                                        <th>${index + 1}</th>
                                        <td>${order.product_name}</td>
                                        <td>${order.price}</td>
                                        <td>${order.size || 'N/A'}</td>
                                        <td>${order.quantity}</td>
                                    </tr>
                                `;
                            });
                        } else {
                            orderItems = '<tr><td colspan="5">No orders found.</td></tr>';
                        }
                        orderList.append(orderItems);
                        order.removeClass('d-none');
                        order.data('currentCustomer', customerId);
                    },
                    error: function (error) {
                        orderList.html('<tr><td colspan="5">Failed to load orders.</td></tr>');
                    }
                });
            } else {
                order.addClass('d-none');
                orderList.empty(); 
                orderNumberElement.text(''); 
                order.removeData('currentCustomer');
            }
        });
    });

    function updateStatus(status, customerId) {
        $.ajax({
            url: '/api/status/' + customerId,
            type: "PUT",
            data: {
                _token: '{{ csrf_token() }}',
                status: status
            },
            success: function (response) {
                location.reload();
            },
            error: function (response) {
                alert('Something went wrong!');
            }
        });
    }
</script>

