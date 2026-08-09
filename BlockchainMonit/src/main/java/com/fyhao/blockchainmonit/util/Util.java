package com.fyhao.blockchainmonit.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Util {

	public static String formatTime(String format, Date date) {
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		return sdf.format(date);
	}
}
