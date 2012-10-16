package org.springone.demo.orders;

import java.util.ArrayList;
import java.util.List;

import org.springframework.integration.Message;
import org.springframework.integration.core.PollableChannel;

public class DeliveryReleaser {

	private final PollableChannel deliveryChannel;

	public DeliveryReleaser(PollableChannel deliveryChannel){
		this.deliveryChannel = deliveryChannel;
	}

	public String release() throws Exception{
		System.out.println("Polling");
		List<String> deliveries = new ArrayList<String>();
		Message<String> deliveryMessage = (Message<String>) this.deliveryChannel.receive(10);
		System.out.println("deliveryMessage: " + deliveryMessage);
		while (deliveryMessage != null) {
			deliveries.add(deliveryMessage.getPayload());
			deliveryMessage = (Message<String>) this.deliveryChannel.receive(10);
			System.out.println("AdeliveryMessage: " + deliveryMessage);
		}
		System.out.println("Done with getting deliveries");
//		ObjectMapper mapper = new ObjectMapper();
//		String strDeliveries = mapper.writeValueAsString(deliveries);
		System.out.println("Sending deliveries: " + deliveries.toString());
		return deliveries.toString();
	}
}
