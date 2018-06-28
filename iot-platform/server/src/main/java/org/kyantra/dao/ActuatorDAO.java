package org.kyantra.dao;

import org.hibernate.Session;
import org.kyantra.beans.RuleBean;
import org.kyantra.beans.ActuatorBean;
import org.kyantra.beans.ThingBean;

public class ActuatorDAO extends BaseDAO {
    static ActuatorDAO instance = new ActuatorDAO();
    public static ActuatorDAO getInstance() { return instance; }

    public ActuatorBean add(ActuatorBean bean) {
        Session session = getService().getSessionFactory().openSession();
        session.beginTransaction();

        RuleBean ruleBean = RuleDAO.getInstance().get(bean.getParentRule().getId());
        ActuatorBean actuatorBean = ruleBean.addActuatorAction(bean);

        session.saveOrUpdate(ruleBean);
        session.getTransaction().commit();
        session.close();
        return actuatorBean;
    }

    public ActuatorBean get(Integer id) {
        Session session = getService().getSessionFactory().openSession();
        ActuatorBean actuatorBean = session.get(ActuatorBean.class, id);
        session.close();
        return actuatorBean;
    }
}
