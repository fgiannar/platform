/*   
   Copyright 2011-2012 The Cassandra Consortium (cassandra-fp7.eu)

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

package eu.cassandra.sim.utilities;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import com.mongodb.BasicDBList;

public class Utils
{

  public static double[] dblist2doubleArr (BasicDBList list)
  {
    double[] arr = new double[list.size()];
    for (int i = 0; i < list.size(); i++) {
      arr[i] = Double.parseDouble(list.get(i).toString());
    }
    return arr;
  }

  public static float[] dblist2floatArr (BasicDBList list)
  {
    float[] arr = new float[list.size()];
    for (int i = 0; i < list.size(); i++) {
      arr[i] = ((Float) list.get(i)).floatValue();
    }
    return arr;
  }

  public static int[] dblist2intArr (BasicDBList list)
  {
    int[] arr = new int[list.size()];
    for (int i = 0; i < list.size(); i++) {
      arr[i] = ((Integer) list.get(i)).intValue();
    }
    return arr;
  }

  public static String hashcode (String message)
  {
    String hash = null;
    try {
      MessageDigest cript = MessageDigest.getInstance("SHA-1");
      cript.reset();
      cript.update(message.getBytes("utf8"));
      hash = new BigInteger(1, cript.digest()).toString(16);
    }
    catch (NoSuchAlgorithmException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
    catch (UnsupportedEncodingException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
    return hash;
  }

  /*
    public static void createHistogram (String title, String x, String y,
                                        Double[] data)
    {

      XYSeries series = new XYSeries("Data");

      for (int i = 0; i < data.length; i++) {
        series.add(i, data[i]);
      }

      final XYDataset dataset = new XYSeriesCollection(series);
      PlotOrientation orientation = PlotOrientation.VERTICAL;
      boolean show = false;
      boolean toolTips = false;
      boolean urls = false;

      JFreeChart chart =
        ChartFactory.createXYLineChart(title, x, y, dataset, orientation, show,
                                       toolTips, urls);
      int width = 1024;
      int height = 768;

      try {
        ChartUtilities.saveChartAsPNG(new File(title + ".PNG"), chart, width,
                                      height);
      }
      catch (IOException e) {
      }

    }
  */
  public static String readFile (String file) throws IOException
  {
    BufferedReader reader = new BufferedReader(new FileReader(file));
    String line = null;
    StringBuilder stringBuilder = new StringBuilder();
    String ls = System.getProperty("line.separator");

    while ((line = reader.readLine()) != null) {
      stringBuilder.append(line);
      stringBuilder.append(ls);
    }

    return stringBuilder.toString();
  }

  /**
   * @param args
   */
  public static void main (String[] args)
  {
    System.out.println(hashcode((new Long(System.currentTimeMillis())
            .toString())));
  }

}
