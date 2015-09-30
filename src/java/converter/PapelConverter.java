package converter;

import javax.faces.component.UIComponent;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;
import javax.persistence.EntityManager;
import javax.servlet.http.HttpServletRequest;
import modelo.OcorrenciaTipo;
import modelo.Papel;


@FacesConverter(value = "papelConverter", forClass = Papel.class)
public class PapelConverter implements Converter{

    @Override
    public Object getAsObject(FacesContext context, UIComponent component, String value) {
        
        if(value == null || value.isEmpty()){
            return null;
        }
        
        Integer id = Integer.valueOf(value);
        
        FacesContext fc = FacesContext.getCurrentInstance();
        ExternalContext ec = fc.getExternalContext();
        HttpServletRequest request = (HttpServletRequest) ec.getRequest();
        EntityManager manager = (EntityManager) request.getAttribute("EntityManager");
        
        Papel papel = manager.find(Papel.class, id);
        
        return papel;
    }

    @Override
    public String getAsString(FacesContext context, UIComponent component, Object value) {
        Papel papel = (Papel) value;
        if(papel == null || papel.getId() == null){
            return null;
        }
        
        return String.valueOf(papel.getId());
    }
    
}
