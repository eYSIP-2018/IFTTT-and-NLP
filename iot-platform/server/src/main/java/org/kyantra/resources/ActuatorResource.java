package org.kyantra.resources;

import org.kyantra.beans.ActuatorBean;
import org.kyantra.dao.ActuatorDAO;
import org.kyantra.interfaces.Session;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/actuator")
public class ActuatorResource extends BaseResource {

    @GET
    @Path("/get/{id}")
    @Session
    @Produces(MediaType.APPLICATION_JSON)
    public String getActuatorBean(@PathParam("id") Integer id) {
        ActuatorBean actuatorBean = ActuatorDAO.getInstance().get(id);
        return gson.toJson(actuatorBean);
    }
}
