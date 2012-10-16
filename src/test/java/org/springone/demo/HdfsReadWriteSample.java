package org.springone.demo;

import java.io.StringWriter;
import java.net.URI;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.codehaus.jackson.map.ObjectMapper;

import org.springframework.integration.Message;
import org.springframework.integration.support.MessageBuilder;

public class HdfsReadWriteSample {

	/**
	 * @param args
	 */
	public static void main(String[] args) throws Exception {

		// Uncomment to run a particular sample
		//new HdfsReadWriteSample().read();

		new HdfsReadWriteSample().write();

	}

	/**
	 * Will read file(s) from /user/hduser/input/ directory of HDFS
	 */
	// Make sure to point to the right Hadoop instance  (host:port) line 38 and 58
	// Assumes there is a file(s) in /user/hduser/input/ directory of HDFS
	// Also assume hadoop is running as 'hduser'. If not change the user name of the hadoop process on line 30
	public void read() throws Exception{
		Configuration configuration = new Configuration();
		FileSystem fs = FileSystem.get(new URI("hdfs://192.168.15.20:54310"), configuration, "hduser");
		Path inFile = new Path("/user/hduser/input/pg500.txt");
		System.out.println(fs.exists(inFile));
		FSDataInputStream in = fs.open(inFile);

		byte[] buffer = new byte[1024];
		int bytesRead = 0;
		while ((bytesRead = in.read(buffer)) > 0) {
			System.out.println(new String(buffer));
		}
		in.close();
	}

	/**
	 * Will write 10 Messages to /user/hduser/output/messages.txt of HDFS in JSON format
	 */
	// Assumes /user/hduser/output/ of HDFS does not exists
	// Also assume hadoop is running as 'hduser'. If not change the user name of the hadoop process on line 58
	public void write() throws Exception{
		Configuration configuration = new Configuration();
		FileSystem fs = FileSystem.get(new URI("hdfs://192.168.15.20:54310"), configuration, "hduser");
		Path outFile = new Path("/user/hduser/output/messages.txt");
		FSDataOutputStream out = fs.create(outFile);

		ObjectMapper mapper = new ObjectMapper();
		for (int i = 0; i < 10; i++) {
			Thread.sleep(100);
			StringWriter writer = new StringWriter();
			Message<?> message = MessageBuilder.withPayload("Hello Hadoop + " + System.currentTimeMillis()).setHeader("name", "Oleg").build();
			mapper.writeValue(writer, message);
			out.write((writer.toString() + "\n").getBytes());
		}

		out.close();
	}
}
