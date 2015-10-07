<%@ Page Title="Tipo de Ocorrência" MasterPageFile="~/Site.master" Language="C#" AutoEventWireup="true" CodeFile="Tipo.aspx.cs" Inherits="Tipo" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <script type="text/javascript">
        function editar(id, nome) {
            $("#myModal #txtNome").val(nome);
            $("#myModal #tipoID").val(id);
            $('#myModal').modal({});
            return false;
        }

        $(document).ready(function () {
            var Titulo = "Deletar";
            var body = "Deletar";
            $(".confirmParametros").click(function () {
                OpenConfirm(Titulo, body + " <b>" + $(this).attr("userTypeDesc") + "</b>" + " ?", $(this).attr("parametros"));
            });
        });
    </script>

    <!-- Modal -->
    <div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h3 id="myModalLabel"></h3>
        </div>
        <div class="modal-body">
            <asp:ValidationSummary runat="server" ID="ValidationSummary1" ClientIDMode="Static" DisplayMode="BulletList" ShowMessageBox="False" ShowSummary="True" CssClass="alert alert-danger" ValidationGroup="validacao" />
            <div class="control-group">
                <label class="control-label" for="inputTypeDesc">Nome</label>
                <div class="controls" id="campoTagName">
                    <asp:TextBox runat="server" CssClass="form-control UserTypeName" ID="txtNome" ClientIDMode="Static" />
                    <asp:TextBox runat="server" CssClass="hidden UserType" ID="tipoID" ClientIDMode="Static" />
                    <%--<asp:RequiredFieldValidator ID="rfvtxtNome" runat="server" ControlToValidate="txtNome" SetFocusOnError="True" CssClass="alert-text" ForeColor="Red" ValidationGroup="validacao" ErrorMessage="O campo Nome é Obrigatório">*</asp:RequiredFieldValidator>--%>
                </div>
            </div>

        </div>
        <div class="modal-footer">
            <button class="btn" data-dismiss="modal" aria-hidden="true">Fechar</button>
            <asp:Button runat="server" ID="btSave" CommandName="Save" CssClass="btn btn-primary" OnClick="btSave_Click" ValidationGroup="validacao" Text="Salvar" />
        </div>
    </div>
    <!-- End Modal -->



    <div class="container-fluid">

        <div class="page-header">
            <h4>Tipo de Ocorrência</h4>
        </div>

        <div id="div-center" class="div-center" style="text-align: center;">
            <div id="content-center" class="div-smaller" style="display: inline-block;">

                <div style="text-align: right;">
                    <a href="#" id="modalButton" role="button" class="btn btn-primary" onclick="editar('', '')">Criar novo Tipo</a>
                </div>
                <br />
                <asp:GridView ID="gridTipos" ClientIDMode="Static" runat="server" AutoGenerateColumns="false" CellPadding="3" CssClass="table table-condensed grid-view-padrao" ForeColor="#333333" GridLines="None" AllowPaging="True" AllowSorting="True" PageSize="50">

                    <Columns>

                        <asp:BoundField DataField="nome" HeaderText="Tipo" HeaderStyle-CssClass="align-column-left" />


                        <asp:TemplateField HeaderText="Ações" ItemStyle-CssClass="options">
                            <ItemTemplate>
                                <div class="btn-group">
                                    <a class="btn btn-small dropdown-toggle" data-toggle="dropdown" href="#">Opções
                                    <span class="caret"></span>
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li><a href="#" class="confirmParametros" usertypedesc="<%# DataBinder.Eval(Container.DataItem, "nome").ToString() %>" parametros="<%#  string.Format("{0}", DataBinder.Eval(Container.DataItem, "id").ToString()) %>">Deletar</a></li>
                                        <li><a href="#" onclick="editar('<%# DataBinder.Eval(Container.DataItem, "id").ToString() %>', '<%# DataBinder.Eval(Container.DataItem, "nome").ToString() %>')">Editar</a></li>
                                    </ul>
                                </div>
                            </ItemTemplate>
                        </asp:TemplateField>
                    </Columns>

                    <HeaderStyle CssClass="grid-head" ForeColor="White" />
                    <RowStyle CssClass="grid-row" />
                    <AlternatingRowStyle CssClass="grid-row-alt" />
                    <PagerStyle CssClass="grid-row-footer" ForeColor="White" />
                    <FooterStyle CssClass="grid-head" ForeColor="White" />

                </asp:GridView>

            </div>
        </div>
    </div>


</asp:Content>
