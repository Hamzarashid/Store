<x-app-layout>
    <x-slot name="header">
        <div class="section-header">
            <h1>Dashboard</h1>
        </div>
    </x-slot>

    <div class="section-body">
        <!-- Metrics Cards -->
        <div class="row">
            <div class="col-lg-3 col-md-6">
                <div class="card custom-card">
                    <div class="custom-card-body">
                        <div class="icon-container">
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                        <div class="text-container">
                            <h4>Total Orders</h4>
                            <h2>{{ 123 }}</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-3 col-md-6">
                <div class="card custom-card">
                    <div class="custom-card-body">
                        <div class="icon-container">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                        <div class="text-container">
                            <h4>Total Sales</h4>
                            <h2>${{ number_format(200, 2) }}</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-3 col-md-6">
                <div class="card custom-card">
                    <div class="custom-card-body">
                        <div class="icon-container">
                            <i class="fas fa-file-invoice"></i>
                        </div>
                        <div class="text-container">
                            <h4>Invoices</h4>
                            <h2>{{ 400 }}</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-3 col-md-6">
                <div class="card custom-card">
                    <div class="custom-card-body">
                        <div class="icon-container">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="text-container">
                            <h4>Customers</h4>
                            <h2>{{ 500 }}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Sales/Profit Graph -->
        <div class="card">
            <div class="card-header">
                <h4>Total Sales / Profit Trends</h4>
            </div>
            <div class="card-body">
                <div id="sales-profit-graph" style="height: 300px;"></div>
            </div>
        </div>

        <!-- Invoices Table -->
        <div class="card">
            <div class="card-header">
                <h4>Recent Invoices</h4>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Customer</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{{ 2 }}</td>
                                <td>{{ 'test' }}</td>
                                <td>${{ number_format(300, 2) }}</td>
                                <td>
                                    <span class="badge {{ 'Paid' === 'Paid' ? 'badge-success' : 'badge-warning' }}">
                                        {{ 'Paid' }}
                                    </span>
                                </td>
                                <td>{{ '2024-05-04' }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>

<!-- Add Chart.js or ApexCharts -->
<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
<script>
    document.addEventListener("DOMContentLoaded", function () {

        // Sales/Profit Graph
        const salesProfitOptions = {
            chart: { type: 'area', height: 300 },
            series: [
                { name: 'Total Sales', data: [200, 300, 400, 350, 450, 500] },
                { name: 'Profit', data: [100, 150, 200, 180, 250, 300] },
            ],
            colors: ['#47c363', '#6777ef'],
            xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
            stroke: { curve: 'smooth', width: 2 },
            fill: { type: 'gradient', gradient: { shade: 'light', type: 'vertical', stops: [0, 100] } },
        };

        new ApexCharts(document.querySelector("#sales-profit-graph"), salesProfitOptions).render();
    });
</script>


<style>
    .custom-card {
        background-color: #fff;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 1rem;
        position: relative;
    }

    .custom-card-body {
        display: flex;
        align-items: center;
    }

    .icon-container {
        background-color: #eef3ff;
        border-radius: 8px;
        padding: 10px;
        color: #6777ef;
        margin-right: 15px;
    }

    .icon-container i {
        font-size: 24px;
    }

    .text-container h4 {
        margin: 0;
        color: #6c757d;
        font-size: 14px;
    }

    .text-container h2 {
        margin: 0;
        font-size: 22px;
        font-weight: bold;
    }

</style>