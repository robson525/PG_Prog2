﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using System.Collections.Generic;

public partial class Estudante
{
    public int id { get; set; }
    public string matricula { get; set; }

    public virtual Usuario Usuario { get; set; }
}

public partial class Funcionario
{
    public int id { get; set; }
    public string siape { get; set; }

    public virtual Usuario Usuario { get; set; }
}

public partial class Ocorrencia
{
    public int id { get; set; }
    public string descricao { get; set; }
    public string local { get; set; }
    public int papel { get; set; }
    public int tipoOcorrencia { get; set; }
    public int setor { get; set; }
    public int usuario { get; set; }

    public virtual Papel Papel1 { get; set; }
    public virtual Setor Setor1 { get; set; }
    public virtual TipoOcorrencia TipoOcorrencia1 { get; set; }
    public virtual Usuario Usuario1 { get; set; }
}

public partial class Outro
{
    public int id { get; set; }
    public string cpf { get; set; }

    public virtual Usuario Usuario { get; set; }
}

public partial class Papel
{
    public Papel()
    {
        this.Ocorrencia = new HashSet<Ocorrencia>();
    }

    public int id { get; set; }
    public string nome { get; set; }

    public virtual ICollection<Ocorrencia> Ocorrencia { get; set; }
}

public partial class Setor
{
    public Setor()
    {
        this.Ocorrencia = new HashSet<Ocorrencia>();
    }

    public int id { get; set; }
    public string nome { get; set; }
    public int unidade { get; set; }

    public virtual ICollection<Ocorrencia> Ocorrencia { get; set; }
    public virtual Unidade Unidade1 { get; set; }
}

public partial class TipoOcorrencia
{
    public TipoOcorrencia()
    {
        this.Ocorrencia = new HashSet<Ocorrencia>();
    }

    public int id { get; set; }
    public string nome { get; set; }

    public virtual ICollection<Ocorrencia> Ocorrencia { get; set; }
}

public partial class Unidade
{
    public Unidade()
    {
        this.Setor = new HashSet<Setor>();
    }

    public int id { get; set; }
    public string nome { get; set; }

    public virtual ICollection<Setor> Setor { get; set; }
}

public partial class Usuario
{
    public Usuario()
    {
        this.Ocorrencia = new HashSet<Ocorrencia>();
    }

    public int id { get; set; }
    public string nome { get; set; }
    public string telefone { get; set; }
    public string email { get; set; }

    public virtual Estudante Estudante { get; set; }
    public virtual Funcionario Funcionario { get; set; }
    public virtual ICollection<Ocorrencia> Ocorrencia { get; set; }
    public virtual Outro Outro { get; set; }
}
