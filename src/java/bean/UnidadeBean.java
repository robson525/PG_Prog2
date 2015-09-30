package bean;

import java.util.List;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;
import javax.persistence.Query;
import modelo.Unidade;

@ManagedBean
@ViewScoped
public class UnidadeBean extends BeanGeral{

    Unidade unidade;
    List<Unidade> unidades;
    
    public UnidadeBean() {
        super();
        this.unidade = new Unidade();
        
        try{
            Query query = super.manager.createNamedQuery("Unidade.findAll", Unidade.class);
            this.unidades = query.getResultList();
        }
        catch(Exception ex){
            System.err.println(ex.getMessage());
        }
        
    }

    public Unidade getUnidade() {
        return unidade;
    }

    public void setUnidade(Unidade unidade) {
        this.unidade = unidade;
    }

    public List<Unidade> getUnidades() {
        return unidades;
    }

    public void setUnidades(List<Unidade> unidades) {
        this.unidades = unidades;
    }
    
    
    
}
