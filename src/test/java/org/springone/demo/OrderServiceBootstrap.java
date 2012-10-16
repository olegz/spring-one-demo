package org.springone.demo;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class OrderServiceBootstrap {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		new ClassPathXmlApplicationContext("orders-config.xml");

	}

}
