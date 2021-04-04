import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import App from './containers/App';
import Initializer from './containers/Initializer';
import lifecycles from './lifecycles';
import trads from './translations';
import PostCount from './components/PostCount'

export default strapi => {
  const pluginDescription = pluginPkg.strapi.description || pluginPkg.description;
  const icon = pluginPkg.strapi.icon;
  const name = pluginPkg.strapi.name;

  const plugin = {
    // Props can be either null or React node (e.g. () => <div />)
    blockerComponent: null,
    // Props to provide to customise the blockerComponent
    blockerComponentProps: {},
    description: pluginDescription,
    id: pluginId,
    // type : node
    initializer: Initializer,
    // The app will load until this property is true
    isReady: false,
    // The plugin's App container,
    mainComponent: App,
    name,
    icon,
    // pluginLogo	file	The plugin's logo
    injectedComponents: [],
    isRequired: pluginPkg.strapi.required || false,
    layout: null,
    lifecycles,
    // Whether or not display the plugin's blockerComponent instead of the main component
    preventComponentRendering: false,
    // The plugin's translation files
    trads,
    // reducers	object	The plugin's redux reducers

    // Refer to the Plugins settings API
    // https://strapi.io/documentation/developer-docs/latest/development/local-plugins-customization.html#plugin-s-front-end-settings-api
    settings: {


      // Add a link into the global section of the settings view
      // Нажми settings - будет в самом верху
      global: {
        links: [
          {
            title: 'Меню в разделе Settings - в секции Global Settings',
            to: `${strapi.settingsBaseURL}/setting-link-1`,
            name: 'Меню в разделе Settings - в секции Global Settings',
            Component: PostCount,
            // Bool : https://reacttraining.com/react-router/web/api/Route/exact-bool
            exact: false,
            // permissions: [{action: 'plugins::my-plugin.action-name', subject: null}],
          },
        ],
      },
      // mainComponent: PostCount,

      menuSection: {
        // Описание секции меню плагина
        id: 'Internalization',
        title: {
          id: pluginId,
          defaultMessage: 'Custom Plugin Gayrat section'
        },
        // Пункты меню
        links: [
          {
            title: {
              id: `${pluginId}.answer`,
              defaultMessage: 'The Answer - Custom Plugin Gayrat section'
            },
            to: `${strapi.settingsBaseURL}/${pluginId}/answer`,
            Component: PostCount
          },
          {
            title: {
              id: `${pluginId}.question`,
              defaultMessage: 'Интернализация - Custom Plugin Gayrat section'
            },
            to: `${strapi.settingsBaseURL}/${pluginId}/answer`,
            Component: PostCount
          }
        ]
      }
    },
    // Define where the link of your plugin will be set. Without this your plugin will not display a link in the left menu
    menu: {


      // Отвечает за меню слева в секции PLUGINS
      pluginsSectionLinks: [
        {
          destination: `/plugins/${pluginId}`,
          icon: 'paw',
          label: {
            id: `${pluginId}.plugin.name`,
            defaultMessage: 'Плагин settings demo',
          },
          name,
          permissions: [
            // Uncomment to set the permissions of the plugin here
            // {
            //   action: '', // the action name should be plugins::plugin-name.actionType
            //   subject: null,
            // },
          ],
        },
        {
          destination: `/plugins/${pluginId}/2`,
          icon: 'cat',
          label: 'Плагин settings меню2',
          name: name + 1,
          permissions: [],
        },
      ],
    },
  };

  return strapi.registerPlugin(plugin);
};
