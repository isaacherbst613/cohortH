(function () {
    'use strict';

    class Items {
        constructor(name, total, quantity) {
            this.name = name;
            this.price = total / quantity;
            this.quantity = quantity;
        }
    }

    class Order {
        constructor(customerName, customerAdd, items) {
            this.items = [...items];
            this.customerName = customerName;
            this.customerAdd = customerAdd;
        }
        get total() {
            let total = 0;
            for (let i = 0; i < this.items.length; i++) {
                total += this.items[i].price * this.items[i].quantity;
            }
            return total;
        }
    }

    async function getOrders() {
        const response = await fetch('orders.json');
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        const orders = await response.json();

        orders.forEach(order => {
            let orderList = [];
            order.items.forEach(item => {
                const orderItems = new Items(item.item, item.total, item.quantity);
                orderList.push(orderItems);
            });
            const thisOrder = new Order(order.customer, order.address, orderList);



            ///layout html
            const table = document.createElement('table');
            const caption = document.createElement('caption');
            caption.innerHTML = `<h3>${thisOrder.customerName}<br>${thisOrder.customerAdd}</h3>`;
            table.append(caption);
            const thead = document.createElement('thead');
            thead.innerHTML = `<thead> 
                                    <tr>
                                        <th>Items</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>`;
            table.append(thead);
            const tbody = document.createElement('tbody');
            thisOrder.items.forEach(item => {
                tbody.innerHTML += `<tr>
                                    <td>${item.name}</td>
                                    <td>&#36 ${rightPad(item.price)}</td>
                                    <td>${item.quantity}</td>
                                    <td>&#36 ${rightPad(item.price * item.quantity)}</td>
                                </tr>
                                `;
            });
            table.append(tbody);
            const tfoot = document.createElement('tfoot');
            tfoot.innerHTML = `<tr>
                                    <td colspan="3">Order Total</td>
                                    <td>&#36 ${rightPad(thisOrder.total)}</td>
                                </tr>`;
            table.append(tfoot);

            document.querySelector('body').append(table);

            console.log(thisOrder);
        });


    }

    getOrders();

    function rightPad(x) {
        if (String(x).includes('.')) {
            if(String(x).split('.')[1].length===1){
                x = x + '0';
            }
        }
        else { x = x + '.00'; }
        return x;
    }



}());