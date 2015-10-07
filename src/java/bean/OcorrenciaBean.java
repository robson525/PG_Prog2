package bean;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;
import javax.persistence.Query;
import modelo.Estudante;
import modelo.Funcionario;
import modelo.Ocorrencia;
import modelo.OcorrenciaTipo;
import modelo.Outro;
import modelo.Papel;
import modelo.Unidade;
import modelo.Usuario;

@ManagedBean
@ViewScoped
public class OcorrenciaBean extends BeanGeral {

    private Ocorrencia ocorrencia;
    private List<OcorrenciaTipo> tiposOcorrencia;
    private List<String> tiposUsuairos;
    private List<Papel> papeis;
    private String tipoUsuario;
    private String matricula;
    private Unidade unidade;

    public OcorrenciaBean() {
        super();
        this.ocorrencia = new Ocorrencia();
        this.ocorrencia.setUsuario(new Usuario());

        this.carregarTiposUsuairo();
        this.carregarTiposOcorrencia();
        this.carregarPapeis();

    }

    public void salvar() {
        super.atualizaManager();

        FacesMessage msg;
        try {
            Object usuario;
            switch (this.tipoUsuario) {
                case "Estudante":
                    usuario = new Estudante(null, this.matricula, this.ocorrencia.getUsuario());
                    break;

                case "Funcionario":
                    usuario = new Funcionario(null, this.matricula, this.ocorrencia.getUsuario());
                    break;

                default:
                    usuario = new Outro(null, this.matricula, this.ocorrencia.getUsuario());
            }

            super.manager.persist(this.ocorrencia.getUsuario());
            super.manager.persist(usuario);
            this.ocorrencia.setData(new Date());
            super.manager.persist(this.ocorrencia);

            this.ocorrencia = new Ocorrencia();
            this.matricula = null;
            this.unidade = null;
            this.carregarTiposUsuairo();

            msg = new FacesMessage(FacesMessage.SEVERITY_INFO, "Sucesso", "Ocorrência salva com Sucesso");

        } catch (Exception ex) {
            msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, "Erro", "Ocorreu um Erro ao Salvar a Ocorrência");
        }

        FacesContext.getCurrentInstance().addMessage(null, msg);
    }

    private void carregarTiposUsuairo() {
        this.tiposUsuairos = new ArrayList<String>();
        this.tiposUsuairos.add("Estudante");
        this.tiposUsuairos.add("Funcionario");
        this.tiposUsuairos.add("Outro");
    }

    private void carregarTiposOcorrencia() {
        try {
            Query query = super.manager.createNamedQuery("OcorrenciaTipo.findAll", OcorrenciaTipo.class);
            this.tiposOcorrencia = query.getResultList();
        } catch (Exception ex) {
            System.err.println(ex.getMessage());
        }

    }

    private void carregarPapeis() {
        try {
            Query query = super.manager.createNamedQuery("Papel.findAll", Papel.class);
            this.papeis = query.getResultList();
        } catch (Exception ex) {
            System.err.println(ex.getMessage());
        }

    }

    public Ocorrencia getOcorrencia() {
        return ocorrencia;
    }

    public void setOcorrencia(Ocorrencia ocorrencia) {
        this.ocorrencia = ocorrencia;
    }

    public List<OcorrenciaTipo> getTiposOcorrencia() {
        return tiposOcorrencia;
    }

    public void setTiposOcorrencia(List<OcorrenciaTipo> tiposOcorrencia) {
        this.tiposOcorrencia = tiposOcorrencia;
    }

    public List<String> getTiposUsuairos() {
        return tiposUsuairos;
    }

    public void setTiposUsuairos(List<String> tiposUsuairos) {
        this.tiposUsuairos = tiposUsuairos;
    }

    public String getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(String tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public List<Papel> getPapeis() {
        return papeis;
    }

    public void setPapeis(List<Papel> papeis) {
        this.papeis = papeis;
    }

    public Unidade getUnidade() {
        return unidade;
    }

    public void setUnidade(Unidade unidade) {
        this.unidade = unidade;
    }

}
