import createTheme from "../../createTheme"

const colors = {
  primary: "#1e2852",
  secondary: "#ebe5da",
  tertiary: "#ebe5da",
  sky: "#8bddfd"
}

const theme = createTheme(
  colors,
  {
    primary: "Montserrat",
    secondary: "Helvetica"
  },
  {
    progress: {
      pacmanTop: {
        background: colors.tertiary
      },
      pacmanBottom: {
        background: colors.tertiary
      },
      point: {
        borderColor: colors.tertiary
      }
    },
    components: {
      heading: {
        h1: {
          fontSize: "4rem",
          textTransform: "uppercase"
        },
        h2: {
          fontSize: "3.5rem",
          textTransform: "uppercase"
        },
        h3: {
          fontSize: "3rem",
          textTransform: "uppercase"
        },
        h4: {
          fontSize: "2.5rem",
          textTransform: "uppercase"
        },
        h5: {
          fontSize: "2rem",
          textTransform: "uppercase"
        },
        h6: {
          fontSize: "1.5rem",
          textTransform: "uppercase"
        }
      },
      codePane: {
        fontSize: "2rem"
      }
    }
  }
)

export default theme
