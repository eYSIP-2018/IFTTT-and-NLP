package org.kyantra.triggers;

import java.util.Set;
import java.util.List;
import java.net.URL;
import java.net.HttpURLConnection;
import java.io.OutputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import org.hibernate.Session;

import org.kyantra.dao.ThingDAO;
import org.kyantra.dao.DeviceDAO;
import org.kyantra.dao.UnitDAO;
import org.kyantra.beans.ThingBean;
import org.kyantra.beans.UnitBean;
import org.kyantra.beans.UserBean;
import org.kyantra.beans.DeviceBean;
import org.kyantra.helper.AuthorizationHelper;

public class EntityHandler {
    static EntityHandler instance = new EntityHandler();
    public static EntityHandler getInstance() { return instance; }
    static String devAccessToken = "c26d9d9ed040446ab76f3a81d6638e24";

    public static String[] getParameters(Object o) {
        String parameters[] = new String[3];
        if(o instanceof DeviceBean) {
            DeviceBean deviceBean = (DeviceBean) o;
            parameters[0] = deviceBean.getName();
            parameters[1] = "721f3bee-c6fd-442a-9f4f-0fe635039b90";
            parameters[2] = deviceBean.getId().toString();
        } else if(o instanceof ThingBean) {
            ThingBean thingBean = (ThingBean) o;
            parameters[0] = thingBean.getName();
            parameters[1] = "2d3bd045-d49d-460a-bc9f-70ddb1d11d98";
            parameters[2] = thingBean.getId().toString();
        } else if(o instanceof UnitBean) {
            UnitBean unitBean = (UnitBean) o;
            parameters[0] = unitBean.getUnitName();
            parameters[1] = "b1d2f9ee-cfe6-4488-b5fa-74fc9d2ac07a";
            parameters[2] = unitBean.getId().toString();
        } else {
            return null;
        }
        return parameters;
    }

    // request to dialogflow for accessing APIs
    public String requestFor(String url,String type,String inputData) {
        HttpURLConnection con = null;
        StringBuffer content = null;
        try {
            URL urlForRequest = new URL(url);
            con = (HttpURLConnection) urlForRequest.openConnection();
            con.setRequestMethod(type);
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("Authorization", "Bearer "+devAccessToken);
            con.setDoOutput(true);
            String str =  inputData;
            byte[] outputInBytes = str.getBytes("UTF-8");
            OutputStream os = con.getOutputStream();
            os.write( outputInBytes );
            os.close();
            int status = con.getResponseCode();

            BufferedReader in = new BufferedReader( new InputStreamReader(con.getInputStream()));
            String inputLine;
            content = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            con.disconnect();
        } catch(Throwable t) {
            t.printStackTrace();
        }
        return ""+content;
    }

    // get list of all objects
    public Boolean isValid(String objectName,Object o) {
        if(o instanceof ThingBean) {
            int count = 0;
            int page = 0;
            List <ThingBean> objects = ThingDAO.getInstance().list(page++,10);
            while(! objects.isEmpty()) {
                List <ThingBean> objectsPage = ThingDAO.getInstance().list(page,10);
                if( objectsPage.size() == 0) {
                    break;
                }
                objects.addAll(objectsPage);
                page++;
            }
            for(ThingBean object : objects) {
                if(object.getName().equals(objectName)) {
                    count++;
                }
            }
            return count == 1;
        } else if(o instanceof DeviceBean) {
            int count = 0;
            int page = 0;
            List <DeviceBean> objects = DeviceDAO.getInstance().list(page++,10);
            while(! objects.isEmpty()) {
                List <DeviceBean> objectsPage = DeviceDAO.getInstance().list(page,10);
                if( objectsPage.size() == 0) {
                    break;
                }
                objects.addAll(objectsPage);
                page++;
            }
            for(DeviceBean object : objects) {
                if(object.getName().equals(objectName)) {
                    count++;
                }
            }
            return count == 1;
        } else if(o instanceof UnitBean) {
            int count = 0;
            int page = 0;
            List <UnitBean> objects = UnitDAO.getInstance().list(page++,10);
            while(! objects.isEmpty()) {
                List <UnitBean> objectsPage = UnitDAO.getInstance().list(page,10);
                if( objectsPage.size() == 0) {
                    break;
                }
                objects.addAll(objectsPage);
                page++;
            }
            for(UnitBean object : objects) {
                if(object.getUnitName().equals(objectName)) {
                    count++;
                }
            }
            return count == 1;
        }
        return false;
    }

    // add new Entity to dialogflow
    public void triggerAdd(Object o) {
        String parameters[] = getParameters(o);
        String objectName = parameters[0];
        if(!isValid(objectName,o)) {
            return ;
        }
        String eid = parameters[1];
        String url = new String("https://api.dialogflow.com/v1/entities/"+eid+"/entries?v=20150910");
        String inputData =  "[{'synonyms': ['" + objectName + "'],'value': '" + objectName + "'}]";
        String output = requestFor(url,"POST",inputData);
        System.out.println(output);
    }

    // remove entities from dialogflow
    // added recursive strategy for subEntities
    public void triggerDelete(Object o) {
        String parameters[] = getParameters(o);
        String objectName = parameters[0];
        if(!isValid(objectName,o)) {
            return ;
        }
        int id = Integer.parseInt(parameters[2]);
        String eid = parameters[1];
        String url = new String("https://api.dialogflow.com/v1/entities/"+eid+"/entries?v=20150910");
        String inputData =  "['" + objectName + "']";
        String output = requestFor(url,"DELETE",inputData);
        if(o instanceof ThingBean) {
            Set<DeviceBean> devices = DeviceDAO.getInstance().getByThing(id);
            for(DeviceBean deviceBean : devices){
               triggerDelete(deviceBean);
            }
        } else if (o instanceof UnitBean) {
            UnitBean unitBean = (UnitBean) o;
            List<UnitBean> units = unitBean.getSubunits();
            for(UnitBean unit : units) {
                triggerDelete(unit);
                int Uid = unit.getId();
                Set<ThingBean> things = ThingDAO.getInstance().getByUnitId(Uid);
                for(ThingBean thingBean : things){
                   triggerDelete(thingBean);
                }
            }
        }
        System.out.println(output);
    }

    //update entities from dialogflow
    public void triggerUpdate(Object oldO,Object newO) {
        String parameters[] = getParameters(newO);
        String objectName = (String) oldO;
        if(!isValid(objectName,newO)) {
            return ;
        }
        String eid = parameters[1];
        String url = new String("https://api.dialogflow.com/v1/entities/"+eid+"/entries?v=20150910");
        String inputData =  "['" + objectName + "']";
        String output = requestFor(url,"DELETE",inputData);
        System.out.println(output);
        triggerAdd(newO);
    }
}
