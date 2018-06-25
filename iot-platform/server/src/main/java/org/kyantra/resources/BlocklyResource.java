package org.kyantra.resources;

import java.util.Set;
import java.util.List;
import java.net.URL;
import java.net.HttpURLConnection;
import java.io.OutputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;

import org.kyantra.interfaces.Session;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;
import java.util.Set;

import java.util.HashMap;
import java.util.Map;
import org.glassfish.jersey.server.mvc.Template;
import org.kyantra.exceptionhandling.AccessDeniedException;
import org.kyantra.dao.ThingDAO;
import org.kyantra.dao.DeviceDAO;
import org.kyantra.dao.UnitDAO;
import org.kyantra.beans.ThingBean;
import org.kyantra.beans.UnitBean;
import org.kyantra.beans.DeviceAttributeBean;
import org.kyantra.beans.UserBean;
import org.kyantra.beans.DeviceBean;
import org.kyantra.helper.AuthorizationHelper;
import io.swagger.annotations.Api;

@Path("/blockly")
public class BlocklyResource extends BaseResource {
    @GET
    @Session
    @Path("/getJson")
    @Produces(MediaType.TEXT_PLAIN)
    public String getJSON() throws AccessDeniedException {
        int page = 0;
        //Units Json
        List <UnitBean> unitObjects = UnitDAO.getInstance().list(page++,10);
        while(! unitObjects.isEmpty()) {
            List <UnitBean> objectsPage = UnitDAO.getInstance().list(page,10);
            if( objectsPage.size() == 0) {
                break;
            }
            unitObjects.addAll(objectsPage);
            page++;
        }
        String allUnitsJson = "[";
        String unitJson = "{\"\":{\"subunits\": [[]],\"things\": [[]]},";
        for(UnitBean object : unitObjects) {
            allUnitsJson += "[\""+object.getUnitName()+"\",\""+object.getId()+","+object.getUnitName()+"\"],";
            unitJson += "\""+object.getId()+","+object.getUnitName()+"\" : { ";
            unitJson +="\"subunits\" : [ ";
            List <UnitBean> subunits = object.getSubunits();
            if(subunits.size() == 0) {
                unitJson += "[]";
            } else {
                for(UnitBean subObject : subunits) {
                    unitJson+="[\""+subObject.getUnitName()+"\",\""+subObject.getId()+","+subObject.getUnitName()+"\"],";
                }
            }
            unitJson+="],";
            unitJson+="\"things\" : [";
            List <ThingBean> things = object.getThings();
            if(things.size() == 0) {
                unitJson += "[]";
            } else {
                for(ThingBean subObject : things) {
                    unitJson+="[\""+subObject.getName()+"\",\""+subObject.getId()+","+subObject.getName()+"\"],";
                }
            }
            unitJson+="]},";
        }
        allUnitsJson += "]";
        allUnitsJson = allUnitsJson.replace(",]","]");
        unitJson+="}";
        unitJson = unitJson.replace(",]","]");
        unitJson = unitJson.replace(",}","}");

        //Things Json
        page = 0;
        List <ThingBean> thingObjects = ThingDAO.getInstance().list(page++,10);
        while(! thingObjects.isEmpty()) {
            List <ThingBean> thingObjectsPage = ThingDAO.getInstance().list(page,10);
            if( thingObjectsPage.size() == 0) {
                break;
            }
            thingObjects.addAll(thingObjectsPage);
            page++;
        }

        String thingJson = "{\"\": {\"devices\": [[]]},";
        for(ThingBean thingObject : thingObjects) {
            thingJson += "\""+thingObject.getId()+","+thingObject.getName()+"\" : { ";
            thingJson +="\"devices\" : [ ";
            Set <DeviceBean> devices = thingObject.getDevices();
            if(devices.size() == 0) {
                thingJson += "[]";
            } else {
                for(DeviceBean device : devices) {
                    thingJson+="[\""+device.getName()+"\",\""+device.getId()+","+device.getName()+"\"],";
                }
            }

            thingJson+="]},";
        }
        thingJson+="}";
        thingJson = thingJson.replace(",]","]");
        thingJson = thingJson.replace(",}","}");

        //devices Json
        page = 0;
        List <DeviceBean> deviceObjects = DeviceDAO.getInstance().list(page++,10);
        while(! deviceObjects.isEmpty()) {
            List <DeviceBean> objectsPage = DeviceDAO.getInstance().list(page,10);
            if( objectsPage.size() == 0) {
                break;
            }
            deviceObjects.addAll(objectsPage);
            page++;
        }
        String deviceJson = "{\"\": {\"attributes\": [[]]},";
        for(DeviceBean object : deviceObjects) {
            deviceJson += "\""+object.getId()+","+object.getName()+"\" : { ";
            deviceJson +="\"attributes\" : [ ";
            List <DeviceAttributeBean> attributes = object.getDeviceAttributes();
            if(attributes.size() == 0) {
                deviceJson += "[]";
            } else {
                for(DeviceAttributeBean subObject : attributes) {
                    deviceJson+="[\""+subObject.getName()+"\",\""+subObject.getId()+","+subObject.getName()+"\"],";
                }
            }
            deviceJson+="]},";
        }
        deviceJson+="}";
        deviceJson = deviceJson.replace(",]","]");
        deviceJson = deviceJson.replace(",}","}");

        String finalJson = "{\"allUnits\":"+allUnitsJson+",\"unitsJson\":"+unitJson+",\"thingsJson\":"+thingJson+",\"devicesJson\":"+deviceJson+"}";
        return finalJson;
    }

    @GET
    @Path("/createRule")
    @Template(name = "/blockly/createRule.ftl")
    @Session
    public Map<String, Object> createRule() {
        final Map<String, Object> map = new HashMap<String, Object>();
        return map;
    }

    @GET
    @Path("/createThen")
    @Template(name = "/blockly/createThen.ftl")
    @Session
    public Map<String, Object> createThen() {
        final Map<String, Object> map = new HashMap<String, Object>();
        return map;
    }

    @GET
    @Path("/createCron")
    @Template(name = "/blockly/createCron.ftl")
    @Session
    public Map<String, Object> createCron() {
        final Map<String, Object> map = new HashMap<String, Object>();
        return map;
    }
}
