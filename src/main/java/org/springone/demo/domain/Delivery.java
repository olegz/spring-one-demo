package org.springone.demo.domain;

import java.util.Date;

public class Delivery {
	private volatile String name;

	private final Date date = new Date();

	private volatile String customerName;

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getCustomerName() {
		return customerName;
	}

	public Date getDate() {
		return date;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
