package converter;

import javax.faces.component.UIComponent;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;
import javax.persistence.EntityManager;
import javax.servlet.http.HttpServletRequest;
import modelo.OcorrenciaTipo;

@FacesConverter(value = "tipoOcorrenciaConverter", forClass = OcorrenciaTipo.class)
public class TipoOcorrenciaConverter implements Converter{

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
        
        OcorrenciaTipo ocorrenciaTipo = manager.find(OcorrenciaTipo.class, id);
        
        return ocorrenciaTipo;
    }

    @Override
    public String getAsString(FacesContext context, UIComponent component, Object value) {
        OcorrenciaTipo ocorrenciaTipo = (OcorrenciaTipo) value;
        if(ocorrenciaTipo == null || ocorrenciaTipo.getId() == null){
            return null;
        }
        
        return String.valueOf(ocorrenciaTipo.getId());
    }
    
}
