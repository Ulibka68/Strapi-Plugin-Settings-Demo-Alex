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
      menuSection: {
        id: 'Internalization',
        title: {
          id: pluginId,
          defaultMessage: 'Custom Plugin Gayrat section'
        },
        links: [
          {
            title: {
              id: `${pluginId}.answer`,
              defaultMessage: 'The Answer тест'
            },
            to: `${strapi.settingsBaseURL}/${pluginId}/answer`,
            Component: PostCount
          },
          {
            title: {
              id: `${pluginId}.question`,
              defaultMessage: 'Интернализация вопрос'
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
            defaultMessage: name,
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
          label: 'Тестовое меню слева',
          name:name+1,
          permissions: [],
        },
      ],
    },
  };

  return strapi.registerPlugin(plugin);
};
