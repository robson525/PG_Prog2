package bean;

import java.util.List;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.persistence.EntityManager;
import javax.servlet.http.HttpServletRequest;
import modelo.Ocorrencia;
import modelo.OcorrenciaTipo;
import modelo.Papel;
import modelo.Unidade;
import modelo.Usuario;
import org.junit.After;
import org.junit.AfterClass;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
@PrepareForTest(FacesContext.class)
public class OcorrenciaBeanTest {
    
    @Mock
    private EntityManager manager;
    @Mock
    private HttpServletRequest request;
    @Mock
    private ExternalContext ec;
    @Mock
    private FacesContext fc;
    
    @Test
    public void testSalvar() {
        
        this.fc = PowerMockito.mock(FacesContext.class);
        this.ec = PowerMockito.mock(ExternalContext.class);
        this.request = PowerMockito.mock(HttpServletRequest.class);
        this.manager = PowerMockito.mock(EntityManager.class);
        
        PowerMockito.mockStatic(FacesContext.class);
        PowerMockito.when(FacesContext.getCurrentInstance()).thenReturn(this.fc);
        PowerMockito.when(this.fc.getExternalContext()).thenReturn(this.ec);
        PowerMockito.when(this.ec.getRequest()).thenReturn(this.request);
        PowerMockito.when(this.request.getAttribute("EntityManager")).thenReturn(this.manager);

        OcorrenciaBean instance = new OcorrenciaBean();

        instance.salvar();
        
    }
    
    @Test
    public void testFiltrar(){
        
        this.fc = PowerMockito.mock(FacesContext.class);
        this.ec = PowerMockito.mock(ExternalContext.class);
        this.request = PowerMockito.mock(HttpServletRequest.class);
        this.manager = PowerMockito.mock(EntityManager.class);
        
        PowerMockito.mockStatic(FacesContext.class);
        PowerMockito.when(FacesContext.getCurrentInstance()).thenReturn(this.fc);
        PowerMockito.when(this.fc.getExternalContext()).thenReturn(this.ec);
        PowerMockito.when(this.ec.getRequest()).thenReturn(this.request);
        PowerMockito.when(this.request.getAttribute("EntityManager")).thenReturn(this.manager);
        
        ListarOcorrenciaBean instance = new ListarOcorrenciaBean();
        
        instance.filtrar();
        
    }
    


    
}
