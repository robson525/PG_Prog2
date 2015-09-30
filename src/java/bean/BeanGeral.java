
package bean;

import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.persistence.EntityManager;
import javax.servlet.http.HttpServletRequest;

public abstract class BeanGeral {

    EntityManager manager = null;
    
    public BeanGeral() {
    
        try {
            FacesContext fc = FacesContext.getCurrentInstance();
            ExternalContext ec = fc.getExternalContext();
            HttpServletRequest request = (HttpServletRequest) ec.getRequest();
            this.manager = (EntityManager) request.getAttribute("EntityManager");

        } catch (Exception ex) {

        }

    }

    protected void atualizaManager() {

        FacesContext fc = FacesContext.getCurrentInstance();
        ExternalContext ec = fc.getExternalContext();
        HttpServletRequest request = (HttpServletRequest) ec.getRequest();
        this.manager = (EntityManager) request.getAttribute("EntityManager");

    }
    
    protected String getRequestURI(){
        FacesContext ctx = FacesContext.getCurrentInstance();
        HttpServletRequest servletRequest = (HttpServletRequest) ctx.getExternalContext().getRequest();

        return servletRequest.getRequestURI();
        
    }
    
}
