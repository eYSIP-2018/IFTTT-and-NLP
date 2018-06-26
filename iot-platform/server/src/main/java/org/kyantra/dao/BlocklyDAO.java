package org.kyantra.dao;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.kyantra.beans.RightsBean;
import org.kyantra.beans.RoleEnum;
import org.kyantra.beans.ThingBean;
import org.kyantra.beans.UnitBean;
import org.kyantra.beans.UserBean;
import org.springframework.jmx.export.notification.UnableToSendNotificationException;

import javax.persistence.Query;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.kyantra.triggers.EntityHandler;

public class BlocklyDAO extends BaseDAO{
    static BlocklyDAO instance = new BlocklyDAO();
    public static BlocklyDAO getInstance(){ return instance; }

    public BlocklyBean add(BlocklyBean currentBlockly){
        Session session = getService().getSessionFactory().openSession();
        session.beginTransaction();
        session.save(currentBlockly);
        session.getTransaction().commit();
        session.close();
        return currentBlockly;
    }

    public BlocklyBean get(Integer id) {
        Session session = getService().getSessionFactory().openSession();
        BlocklyBean blocklyBean = session.get(BlocklyBean.class,id);
        session.close();
        return blocklyBean;
    }

    public void delete(Integer id) {
        Session session = getService().getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        BlocklyBean blockly = session.get(BlocklyBean.class, id);
        session.delete(blockly);
        tx.commit();
        session.close();
    }

    public BlocklyBean update(int id, int blockId, String blockType, String xml) {
        if(id <= 0)
            return null;
        Session session = getService().getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        BlocklyBean blockly = session.get(BlocklyBean.class, id);
        blockly.setBlockId(blockId);
        blockly.setBlockType(blockType);
        blockly.setXml(xml);
        tx.commit();
        session.close();
        return blockly;
    }

    public RuleBean getByBlockIdAndType(int blockId, String blockType) {
        Session session = getService().getSessionFactory().openSession();

        CriteriaBuilder builder = session.getCriteriaBuilder();
        CriteriaQuery<BlocklyBean> criteria = builder.createQuery(BlocklyBean.class);

        Root<BlocklyBean> root = criteria.from(BlocklyBean.class);
        criteria.select(root);
        criteria.where(builder.equal(root.get("blockId"), blockId).and(builder.equal(root.get("blockType"), blockType)));

        Query query = session.createQuery(criteria);
        BlocklyBean blocklyBean = (BlocklyBean) query.getSingleResult();

        session.close();
        return blocklyBean;
    }
}
