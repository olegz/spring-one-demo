package org.springone.demo.orders;

import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.integration.MessageChannel;
import org.springframework.integration.message.GenericMessage;

public class OrdersTest {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("orders-config.xml", OrdersTest.class);
		MessageChannel channel = context.getBean("orderReceiveChannel", MessageChannel.class);
		channel.send(new GenericMessage<String>("{\"name\" : \"Espresso\"}"));
	}

}
