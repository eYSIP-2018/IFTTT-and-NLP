package org.kyantra.resources;

import org.glassfish.jersey.server.mvc.Template;
import org.kyantra.beans.SnsBean;
import org.kyantra.beans.ThingBean;
import org.kyantra.beans.UnitBean;
import org.kyantra.beans.UserBean;
import org.kyantra.dao.*;
import org.kyantra.interfaces.Session;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.NewCookie;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.MediaType;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import com.google.gson.JsonElement;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.google.cloud.dialogflow.v2.*;
import com.google.cloud.dialogflow.v2.TextInput.Builder;

@Path("/")
public class HomeResource extends BaseResource {


    @GET
    @Path("/session/status")
    @Session
    public String setSession(){
        return gson.toJson(getSecurityContext().getUserPrincipal());
    }

    /*
    @POST
    @Path("/webhook")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response webhook(JsonNode data){
        String intentType = data.get("queryResult").get("intent").get("displayName").asText();
        String email = data.get("queryResult").get("parameters").get("email").asText();
        String password = data.get("queryResult").get("parameters").get("password").asText();

        String output = "";

        if(intentType.equals("auth_token"))
        {
            try
            {
                ObjectMapper mapper = new ObjectMapper();
                mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
                JsonNode reply = mapper.readTree("{\"fulfillmentText\": \"This is a text response from iot-platform -> "+output+"\",\"fulfillmentMessages\": [],\"source\": \"https://j8n707ap66.execute-api.us-east-1.amazonaws.com/beta/eYantraWebHook\",\"payload\": {},\"outputContexts\": [],\"followupEventInput\": {}}");
                Object json = mapper.readValue(reply.toString(), Object.class);
                Response response = Response.status(Response.Status.OK).entity(mapper.writerWithDefaultPrettyPrinter().writeValueAsString(json)).header("statusCode","200").build();
                return response;
                //return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(json);
                //return gson.toJson(reply.toString());
            }
            catch(Exception e)
            {
                return null;
            }
        }
        Response response = Response.status(Response.Status.OK).entity("{a:1}").build();
        return response;
    }*/

    @GET
    @Path("/chatbot")
    @Template(name = "/chatbot/chatbot.ftl")
    public Map<String, Object> chatbot() {
        final Map<String, Object> map = new HashMap<String, Object>();
        return map;
    }

    @POST
    @Path("/eyIOT")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response eyIOT(@CookieParam("authorization") String token, @FormParam("str") String str){
        System.out.println("==============================>"+token+"============"+str);
        String stringInput = str;
        String stringOutput = "";

        try(SessionsClient sessionsClient = SessionsClient.create()) {
           SessionName session = SessionName.of("eyantra-iot-f2fbc", token);
           System.out.println("Session Path: " + session.toString());

           Builder textInput = TextInput.newBuilder().setText(stringInput).setLanguageCode("en-US");
           QueryInput queryInput = QueryInput.newBuilder().setText(textInput).build();

           DetectIntentResponse response = sessionsClient.detectIntent(session, queryInput);
           QueryResult queryResult = response.getQueryResult();

            System.out.println("====================");
            System.out.format("Query Text: '%s'\n", queryResult.getQueryText());
            System.out.format("Detected Intent: %s (confidence: %f)\n",
            queryResult.getIntent().getDisplayName(), queryResult.getIntentDetectionConfidence());
            System.out.format("Fulfillment Text: '%s'\n", queryResult.getFulfillmentText());
         }
         catch(Exception e){ System.out.println("======="+e); return null; }
        return null;
    }

    @GET
    @Template(name = "/index.ftl")
    @Session
    public Map<String, Object> index() throws URISyntaxException {
        final Map<String, Object> map = new HashMap<>();
        map.put("active","home");
        UserBean userBean = (UserBean) getSecurityContext().getUserPrincipal();
        Set<UnitBean> unitBeanList = RightsDAO.getInstance().getUnitsByUser(userBean);
        map.put("units",unitBeanList);
        setCommonData(map);
        return map;
    }

    @GET
    @Path("/signup")
    @Template(name = "/auth/signup.ftl")
    public Map<String, Object> signup() {
        final Map<String, Object> map = new HashMap<String, Object>();
        return map;
    }

    @GET
    @Path("/login")
    @Template(name = "/auth/login.ftl")
    public Map<String, Object> login() {
        final Map<String, Object> map = new HashMap<String, Object>();
        return map;
    }

    /*change*/
    @GET
    @Path("/oauth")
    @Template(name = "/auth/oauth.ftl")
    public Map<String, Object> oauth() {
        final Map<String, Object> map = new HashMap<String, Object>();
        return map;
    }

    @GET
    @Path("/units/list")
    @Template(name = "/units/list.ftl")
    @Session
    public Map<String, Object> listUnits() {
        final Map<String, Object> map = new HashMap<String, Object>();
        map.put("active","unit");
        setCommonData(map);
        return map;
    }

    @GET
    @Path("/units/create")
    @Template(name = "/units/create.ftl")
    @Session
    public Map<String, Object> createUnit(@QueryParam("id") Integer id) throws AccessDeniedException{
        //TODO: required?
        if (AuthorizationDAO.getInstance().ownsUnit((UserBean)getSecurityContext().getUserPrincipal(),UnitDAO.getInstance().get(id))) {
            final Map<String, Object> map = new HashMap<String, Object>();
            map.put("active", "unit");
            if (id != null) {
                map.put("unit", UnitDAO.getInstance().get(id));
            }
            setCommonData(map);
            return map;
        }
        else{
            throw new AccessDeniedException();
        }
    }

    @GET
    @Path("/things/list")
    @Template(name = "/thing/list.ftl")
    @Session
    public Map<String, Object> listThings() {
        final Map<String, Object> map = new HashMap<String, Object>();
        map.put("active","thing");
        setCommonData(map);
        return map;
    }

    @GET
    @Path("/things/create")
    @Template(name = "/thing/create.ftl")
    @Session
    public Map<String, Object> createThing() {
        final Map<String, Object> map = new HashMap<String, Object>();
        map.put("active","thing");
        setCommonData(map);
        return map;
    }

    @GET
    @Path("/rights/create")
    @Template(name = "/rights/create.ftl")
    @Session
    public Map<String, Object> createRight() {
        final Map<String, Object> map = new HashMap<String, Object>();
        map.put("active","right");
        setCommonData(map);
        return map;
    }

    @GET
    @Path("/rights/list")
    @Template(name = "/rights/list.ftl")
    @Session
    public Map<String, Object> listRight() {
        final Map<String, Object> map = new HashMap<String, Object>();
        map.put("active","right");
        setCommonData(map);
        return map;
    }
    @GET
    @Path("/users/create")
    @Template(name = "/users/create.ftl")
    @Session
    public Map<String, Object> createUsers() {
        final Map<String, Object> map = new HashMap<String, Object>();
        map.put("active","user");
        setCommonData(map);
        return map;
    }

    @GET
    @Path("/users/list")
    @Template(name = "/users/list.ftl")
    @Session
    public Map<String, Object> listusers() {
        final Map<String, Object> map = new HashMap<String, Object>();
        map.put("active","user");
        setCommonData(map);
        return map;
    }

    @GET
    @Path("/logout")
    @Session
    @Template(name = "index.ftl")
    public Map<String, Object> logout(@Context HttpServletRequest request) throws URISyntaxException {
        final Map<String, Object> map = new HashMap<String, Object>();
        throw new WebApplicationException(Response.temporaryRedirect(new URI("/login")).cookie(new NewCookie("authorization","")).build());
    }

    @GET
    @Path("/unauthorized")
    @Template(name = "/auth/unauthorized.ftl")
    @Session
    public Map<String, Object> unauthorized() throws URISyntaxException{
        final Map<String, Object> map = new HashMap<String, Object>();
        throw new WebApplicationException(Response.temporaryRedirect(new URI("/login")).cookie(new NewCookie("authorization","")).build());
    }

    private void setCommonData(Map<String, Object> map){
        map.put("user",getSecurityContext().getUserPrincipal());
    }

    @GET
    @Path("/units/get/{id}")
    @Template(name = "/units/get.ftl")
    @Session
    public Map<String, Object> getUnit(@PathParam("id") Integer id) {
        final Map<String, Object> map = new HashMap<String, Object>();
        map.put("active","unit");
        UnitBean unit = UnitDAO.getInstance().get(id);
        map.put("unit",unit);
        setCommonData(map);
        return map;
    }

    @GET
    @Path("/things/get/{id}")
    @Template(name = "/thing/get.ftl")
    @Session
    public Map<String, Object> getThing(@PathParam("id") Integer id) {
        final Map<String, Object> map = new HashMap<String, Object>();
        map.put("active","thing");
        ThingBean thing = ThingDAO.getInstance().get(id);
        map.put("thing",thing);
        setCommonData(map);
        return map;
    }

    @GET
    @Path("/things/dashboard/{id}")
    @Template(name = "/thing/dashboard.ftl")
    @Session
    public Map<String, Object> getDashboard(@PathParam("id") Integer id){
        final Map<String, Object> map = new HashMap<String, Object>();
        map.put("active","thing");
        ThingBean thing = ThingDAO.getInstance().get(id);
        map.put("thing",thing);
        setCommonData(map);
        return map;
    }

    @GET
    @Path("/profile")
    @Template(name = "/profile/profile.ftl")
    @Session
    public Map<String, Object> profile() throws URISyntaxException {
        final Map<String, Object> map = new HashMap<>();
        map.put("active","profile");
        UserBean userBean = (UserBean) getSecurityContext().getUserPrincipal();
        //Set<UnitBean> unitBeanList = RightsDAO.getInstance().getUnitsByUser(userBean);
        map.put("user",userBean);
        setCommonData(map);
        return map;
    }

    @GET
    @Path("/rules/sns/{id}")
    @Template(name = "/rules/sns/get.ftl")
    @Session
    public Map<String, Object> getSnsRules(@PathParam("id") Integer id) {
        final Map<String, Object> map = new HashMap<String, Object>();
        map.put("active","sns");
        SnsBean sns = SnsDAO.getInstance().get(id);
        map.put("sns", sns);
        setCommonData(map);
        return map;
    }
}
