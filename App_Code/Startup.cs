using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(VoxData.VoxAccounting.WS.Startup))]
namespace VoxData.VoxAccounting.WS
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=316888
        }
    }
}
