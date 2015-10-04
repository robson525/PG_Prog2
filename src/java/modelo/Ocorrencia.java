/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package modelo;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author Robson
 */
@Entity
@Table(name = "OCORRENCIA")
@NamedQueries({
    @NamedQuery(name = "Ocorrencia.findAll", query = "SELECT o FROM Ocorrencia o"),
    @NamedQuery(name = "Ocorrencia.findById", query = "SELECT o FROM Ocorrencia o WHERE o.id = :id"),
    @NamedQuery(name = "Ocorrencia.findByLocal", query = "SELECT o FROM Ocorrencia o WHERE o.local = :local")})
public class Ocorrencia implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "_id")
    private Integer id;
    
    @Basic(optional = false)
    @NotNull
    @Lob
    @Size(min = 1, max = 65535)
    @Column(name = "DESCRICAO")
    private String descricao;
    
    @Size(max = 200)
    @Column(name = "LOCAL")
    private String local;
    
    @JoinColumn(name = "PAPEL", referencedColumnName = "_id")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Papel papel;
    
    @JoinColumn(name = "SETOR", referencedColumnName = "_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Setor setor;
    
    @JoinColumn(name = "TIPO_OCORRENCIA", referencedColumnName = "_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private OcorrenciaTipo tipoOcorrencia;

    @JoinColumn(name = "USUARIO", referencedColumnName = "_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Usuario usuario;

    public Ocorrencia() {
    }

    public Ocorrencia(Integer id) {
        this.id = id;
    }

    public Ocorrencia(Integer id, String descricao) {
        this.id = id;
        this.descricao = descricao;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getLocal() {
        return local;
    }

    public void setLocal(String local) {
        this.local = local;
    }

    public Papel getPapel() {
        return papel;
    }

    public void setPapel(Papel papel) {
        this.papel = papel;
    }

    public Setor getSetor() {
        return setor;
    }

    public void setSetor(Setor setor) {
        this.setor = setor;
    }

    public OcorrenciaTipo getTipoOcorrencia() {
        return tipoOcorrencia;
    }

    public void setTipoOcorrencia(OcorrenciaTipo tipoOcorrencia) {
        this.tipoOcorrencia = tipoOcorrencia;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Ocorrencia)) {
            return false;
        }
        Ocorrencia other = (Ocorrencia) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "modelo.Ocorrencia[ id=" + id + " ]";
    }
    
}
