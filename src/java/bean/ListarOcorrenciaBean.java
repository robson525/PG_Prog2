package bean;

import java.util.List;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;
import javax.persistence.Query;
import modelo.Ocorrencia;
import modelo.OcorrenciaTipo;
import modelo.Unidade;
import modelo.Usuario;

@ManagedBean
@ViewScoped
public class ListarOcorrenciaBean extends BeanGeral {

    private List<Ocorrencia> ocorrencias;
    private Ocorrencia ocorrenciaSelecionada;
    private Ocorrencia ocorrenciaFiltro;
    private Unidade unidade;
    private List<OcorrenciaTipo> tiposOcorrencia;

    public ListarOcorrenciaBean() {
        super();
        this.carregarOcorrencias();
        this.carregaTipoOcorrencia();
    }

    private void carregarOcorrencias() {
        try {
            Query query = super.manager.createNamedQuery("Ocorrencia.findAll", Ocorrencia.class);
            this.ocorrencias = query.getResultList();
        } catch (Exception ex) {
            System.err.println(ex.getMessage());
        }
    }

    private void carregaTipoOcorrencia() {
        try {
            Query query = super.manager.createNamedQuery("OcorrenciaTipo.findAll", OcorrenciaTipo.class);
            this.tiposOcorrencia = query.getResultList();
        } catch (Exception ex) {
            System.err.println(ex.getMessage());
        }
    }

    public void Filtrar() {

        super.atualizaManager();

        String jpql = "SELECT o FROM Ocorrencia o WHERE 1 = 1 ";

        if (this.ocorrenciaFiltro != null && this.ocorrenciaFiltro.getSetor() == null && this.unidade != null && this.unidade.getId() > 0) {
            jpql += " AND o.setor.unidade.id = " + this.unidade.getId();
        } else if (this.ocorrenciaFiltro != null && this.ocorrenciaFiltro.getSetor() != null && this.ocorrenciaFiltro.getSetor().getId() > 0) {
            jpql += " AND o.setor.id = " + this.ocorrenciaFiltro.getSetor().getId();
        }

        if (this.ocorrenciaFiltro.getTipoOcorrencia() != null && this.ocorrenciaFiltro.getTipoOcorrencia().getId() > 0) {
            jpql += " AND o.tipoOcorrencia = " + this.ocorrenciaFiltro.getTipoOcorrencia().getId();
        }

        try {
            Query query = super.manager.createQuery(jpql, OcorrenciaTipo.class);
            this.ocorrencias = query.getResultList();

        } catch (Exception ex) {
            FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, "Erro", "Ocorreu um Erro ao Buscar Valores " + ex.getMessage());
            FacesContext.getCurrentInstance().addMessage(null, msg);
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

    public Ocorrencia getOcorrenciaFiltro() {
        return ocorrenciaFiltro;
    }

    public void setOcorrenciaFiltro(Ocorrencia ocorrenciaFiltro) {
        this.ocorrenciaFiltro = ocorrenciaFiltro;
    }

    public List<OcorrenciaTipo> getTiposOcorrencia() {
        return tiposOcorrencia;
    }

    public void setTiposOcorrencia(List<OcorrenciaTipo> tiposOcorrencia) {
        this.tiposOcorrencia = tiposOcorrencia;
    }

    public Unidade getUnidade() {
        return unidade;
    }

    public void setUnidade(Unidade unidade) {
        this.unidade = unidade;
    }

    public String tipoUsuario() {
        Usuario usuario = this.ocorrenciaSelecionada.getUsuario();
        if (usuario.getEstudanteList() != null && usuario.getEstudanteList().size() > 0) {
            return "Estudante";
        } else if (usuario.getFuncionarioList() != null && usuario.getFuncionarioList().size() > 0) {
            return "Funcionário";
        } else {
            return "Outro";
        }
    }

}
