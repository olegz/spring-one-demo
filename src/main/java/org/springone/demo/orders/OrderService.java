package org.springone.demo.orders;

import java.util.Random;

import org.springone.demo.domain.Delivery;
import org.springone.demo.domain.Order;

public class OrderService {

	public Delivery process(Order order) throws Exception{
		Thread.sleep(new Random().nextInt(10000));
		Delivery d = new Delivery();
		d.setName(order.getName());
		d.setCustomerName(order.getCustomerName());
		return d;
	}
}
