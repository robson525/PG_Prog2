package converter;

import javax.faces.component.UIComponent;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;
import javax.persistence.EntityManager;
import javax.servlet.http.HttpServletRequest;
import modelo.OcorrenciaTipo;
import modelo.Setor;

@FacesConverter(value = "setorConverter", forClass = Setor.class)
public class SetorConverter implements Converter{
    
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
        
        Setor setor = manager.find(Setor.class, id);
        
        return setor;
    }

    @Override
    public String getAsString(FacesContext context, UIComponent component, Object value) {
        Setor setor = (Setor) value;
        if(setor == null || setor.getId() == null){
            return null;
        }
        
        return String.valueOf(setor.getId());
    }
    
}
