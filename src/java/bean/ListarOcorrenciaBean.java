package bean;

import java.util.List;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;
import javax.persistence.Query;
import modelo.Ocorrencia;
import modelo.OcorrenciaTipo;



@ManagedBean
@ViewScoped
public class ListarOcorrenciaBean extends BeanGeral {
    
    private List<Ocorrencia> ocorrencias;
    private Ocorrencia ocorrenciaSelecionada;

    public ListarOcorrenciaBean() {
        super();
        this.carregarOcorrencias();
        
    }

    private void carregarOcorrencias(){
        try {
            Query query = super.manager.createNamedQuery("Ocorrencia.findAll", Ocorrencia.class);
            this.ocorrencias = query.getResultList();
        } catch (Exception ex) {
            System.err.println(ex.getMessage());
        }
    }
    
    
    public List<Ocorrencia> getOcorrencias() {
        return ocorrencias;
    }

    public void setOcorrencias(List<Ocorrencia> ocorrencias) {
        this.ocorrencias = ocorrencias;
    }

    public Ocorrencia getOcorrenciaSelecionada() {
        return ocorrenciaSelecionada;
    }

    public void setOcorrenciaSelecionada(Ocorrencia ocorrenciaSelecionada) {
        this.ocorrenciaSelecionada = ocorrenciaSelecionada;
    }
    
    
    
    
}
