package org.kyantra.beans;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.kyantra.utils.Constant;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
@Table(name = "actuator")
public class ActuatorBean {

    @Id
    @Expose
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Expose
    @NotNull
    @Column(name = "attribute")
    String attribute;

    @Expose
    @Column(name = "newValue")
    String newValue;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "rule_id")
    private RuleBean parentRule;

    public RuleBean getParentRule() {
        return parentRule;
    }

    public void setParentRule(RuleBean parentRule) {
        this.parentRule = parentRule;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAttribute() {
        return attribute;
    }

    public void setAttribute(String attribute) {
        this.attribute = attribute;
    }

    public String getNewValue() {
        return newValue;
    }

    public void setNewValue(String newValue) {
        this.newValue = newValue;
    }
}
