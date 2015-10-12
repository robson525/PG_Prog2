<%@ Page Title="Cadastrar" MasterPageFile="~/Site.master" Language="C#" AutoEventWireup="true" CodeFile="Cadastrar.aspx.cs" Inherits="Cadastrar" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <script type="text/javascript">
        jQuery(document).ready(function ($) {
            $("#ddlTipoUsuario").change(function () {
                if ($(this).val() == "2") {
                    $("#matLabel").html("SIAP");
                }
                else if ($(this).val() == "3") {
                    $("#matLabel").html("CPF");
                }
                else {
                    $("#matLabel").html("Matricula");
                }
            });
        });
    </script>

    <div class="container-fluid">
        <asp:ValidationSummary runat="server" ID="ValidationSummary1" ClientIDMode="Static" DisplayMode="BulletList" ShowMessageBox="False" ShowSummary="True" CssClass="alert alert-danger" ValidationGroup="validacao" />

        <div class="page-header">
            <h4>Cadastrar Ocorrência</h4>
        </div>

        <div class="control-group">
            <label class="control-label" for="inputTypeDesc">
                <h5>Identificação</h5>
            </label>
        </div>

        <div class="control-group">
            <label class="control-label" for="txtNome">Nome</label>
            <div class="controls">
                <asp:TextBox runat="server" CssClass="form-control" ID="txtNome" MaxLength="50" ClientIDMode="Static" />
                <asp:RequiredFieldValidator ID="rfvtxtNome" runat="server" ControlToValidate="txtNome" SetFocusOnError="True" CssClass="alert-text" ForeColor="Red" ValidationGroup="validacao" ErrorMessage="O campo Nome é Obrigatório">*</asp:RequiredFieldValidator>
            </div>
        </div>

        <div class="control-group">
            <label class="control-label" for="txtEmail">Email</label>
            <div class="controls">
                <asp:TextBox runat="server" CssClass="form-control" ID="txtEmail" MaxLength="50" ClientIDMode="Static" />
                <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txtEmail" SetFocusOnError="True" CssClass="alert-text" ForeColor="Red" ValidationGroup="validacao" ErrorMessage="O campo Email é Obrigatório">*</asp:RequiredFieldValidator>
            </div>
        </div>

        <div class="control-group">
            <label class="control-label" for="txtFone">Telefone</label>
            <div class="controls">
                <asp:TextBox runat="server" CssClass="form-control" ID="txtFone" MaxLength="11" ClientIDMode="Static" />
                <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="txtFone" SetFocusOnError="True" CssClass="alert-text" ForeColor="Red" ValidationGroup="validacao" ErrorMessage="O campo Telefone é Obrigatório">*</asp:RequiredFieldValidator>
            </div>
        </div>

        <div class="control-group">
            <label class="control-label" for="ddlTipoUsuario">Tipo de Usuário</label>
            <div class="controls">
                <asp:DropDownList runat="server" CssClass="form-control" ID="ddlTipoUsuario" ClientIDMode="Static">
                    <asp:ListItem Value="">Selecione</asp:ListItem>
                    <asp:ListItem Value="1">Estudante</asp:ListItem>
                    <asp:ListItem Value="2">Funcionário</asp:ListItem>
                    <asp:ListItem Value="3">Outro</asp:ListItem>
                </asp:DropDownList>
                <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" ControlToValidate="ddlTipoUsuario" SetFocusOnError="True" CssClass="alert-text" ForeColor="Red" ValidationGroup="validacao" ErrorMessage="O campo Tipo de Usuário é Obrigatório">*</asp:RequiredFieldValidator>
            </div>
        </div>

        <div class="control-group">
            <label class="control-label" for="txtFone" id="matLabel">Matricula</label>
            <div class="controls">
                <asp:TextBox runat="server" CssClass="form-control" ID="txtMatricula" MaxLength="15" ClientIDMode="Static" />
                <asp:RequiredFieldValidator ID="RequiredFieldValidator4" runat="server" ControlToValidate="txtMatricula" SetFocusOnError="True" CssClass="alert-text" ForeColor="Red" ValidationGroup="validacao" ErrorMessage="O campo Matricula é Obrigatório">*</asp:RequiredFieldValidator>
            </div>
        </div>

        <div class="control-group">
            <label class="control-label" for="inputTypeDesc">
                <h5>Ocorrência</h5>
            </label>
        </div>

        <div class="control-group">
            <label class="control-label" for="ddlTipoOcorrencia">Tipo de Ocorrência</label>
            <div class="controls">
                <asp:DropDownList runat="server" CssClass="form-control" ID="ddlTipoOcorrencia" ClientIDMode="Static"></asp:DropDownList>
                <asp:RequiredFieldValidator ID="RequiredFieldValidator5" runat="server" ControlToValidate="ddlTipoOcorrencia" SetFocusOnError="True" CssClass="alert-text" ForeColor="Red" ValidationGroup="validacao" ErrorMessage="O campo Tipo de Ocorrência é Obrigatório">*</asp:RequiredFieldValidator>
            </div>
        </div>

        <div class="control-group">
            <label class="control-label" for="ddlPapel">Seu Papel</label>
            <div class="controls">
                <asp:DropDownList runat="server" CssClass="form-control" ID="ddlPapel" ClientIDMode="Static"></asp:DropDownList>
                <asp:RequiredFieldValidator ID="RequiredFieldValidator6" runat="server" ControlToValidate="ddlPapel" SetFocusOnError="True" CssClass="alert-text" ForeColor="Red" ValidationGroup="validacao" ErrorMessage="O campo Papel é Obrigatório">*</asp:RequiredFieldValidator>
            </div>
        </div>

        <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
        <div class="control-group">
            <label class="control-label" for="ddlPapel">Unidade</label>
            <div class="controls">
                <asp:DropDownList runat="server" CssClass="form-control" ID="ddlUnidade" AutoPostBack="true" ClientIDMode="Static" OnSelectedIndexChanged="ddlUnidade_SelectedIndexChanged"></asp:DropDownList>
            </div>
        </div>
        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <ContentTemplate>
                <div class="control-group">
                    <label class="control-label" for="ddlPapel">Setor</label>
                    <div class="controls">
                        <asp:DropDownList runat="server" CssClass="form-control" ID="ddlSetor" ClientIDMode="Static">
                            <asp:ListItem Value="">Selecione uma Unidade</asp:ListItem>
                        </asp:DropDownList>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator7" runat="server" ControlToValidate="ddlSetor" SetFocusOnError="True" CssClass="alert-text" ForeColor="Red" ValidationGroup="validacao" ErrorMessage="O campo Setor é Obrigatório">*</asp:RequiredFieldValidator>
                    </div>
                </div>
            </ContentTemplate>
            <Triggers>
                <asp:AsyncPostBackTrigger ControlID="ddlUnidade" EventName="SelectedIndexChanged" />
            </Triggers>
        </asp:UpdatePanel>
        <div class="control-group">
            <label class="control-label" for="txtEmail">Local</label>
            <div class="controls">
                <asp:TextBox runat="server" CssClass="form-control" ID="txtLocal" MaxLength="50" ClientIDMode="Static" />
            </div>
        </div>

        <div class="control-group">
            <label class="control-label" for="txtEmail">Descrição</label>
            <div class="controls">
                <asp:TextBox runat="server" CssClass="form-control" ID="txtDescricao" TextMode="MultiLine" ClientIDMode="Static" />
                <asp:RequiredFieldValidator ID="RequiredFieldValidator8" runat="server" ControlToValidate="txtDescricao" SetFocusOnError="True" CssClass="alert-text" ForeColor="Red" ValidationGroup="validacao" ErrorMessage="O campo Descrição é Obrigatório">*</asp:RequiredFieldValidator>
            </div>
        </div>

        <div class="form-actions">
            <asp:Button runat="server" ID="btSave" CommandName="Save" CssClass="btn btn-primary" OnClick="btSave_Click" ValidationGroup="validacao" Text="Salvar" />
        </div>

    </div>
</asp:Content>
