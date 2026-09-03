import { useState } from "react";

const COLORS = {
  background: "#F9F9FB",
  terracotta: "#E05A47",
  sage: "#4A6B5D",
  graphite: "#1F2421",
  lightSage: "#E7EFEA",
  border: "#E1E3DF",
  muted: "#69706B",
  white: "#FFFFFF",
};

const categories = [
  { icon: "🍣", label: "Sushi" },
  { icon: "🌿", label: "Vegano" },
  { icon: "🐾", label: "Pet\nFriendly" },
  { icon: "📅", label: "Com\nReservas" },
  { icon: "🇮🇹", label: "Italiano" },
  { icon: "☕", label: "Cafés" },
];

const filters = [
  "Almoço rápido",
  "Encontro romântico",
  "Ir com amigos",
  "Pet friendly",
];

const navigation = [
  { icon: "⌖", label: "Explora" },
  { icon: "⌖", label: "Mapa" },
  { icon: "♡", label: "Match" },
  { icon: "▣", label: "Reservas" },
  { icon: "♙", label: "Perfil" },
];

function App() {
  const [activeFilter, setActiveFilter] =
    useState("Encontro romântico");

  const [activeTab, setActiveTab] =
    useState("Explora");

  const [search, setSearch] = useState("");

  return (
    <div style={styles.page}>
      <div style={styles.phone}>

        {/* STATUS BAR */}
        <div style={styles.statusBar}>
          <strong>9:41</strong>

          <div style={styles.statusRight}>
            <span>●●●</span>
            <span>⌁</span>
            <span>▮</span>
          </div>
        </div>

        {/* CONTEÚDO */}
        <main style={styles.content}>

          {/* BUSCA */}
          <div style={styles.searchRow}>
            <div style={styles.searchBox}>
              <span style={styles.searchIcon}>⌕</span>

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="O que você quer comer hoje?"
                style={styles.searchInput}
              />
            </div>

            <button
              style={styles.settingsButton}
              aria-label="Filtros"
            >
              <span>☷</span>
            </button>
          </div>

          {/* CATEGORIAS */}
          <div style={styles.categoryContainer}>
            {categories.map((category) => (
              <button
                key={category.label}
                style={styles.categoryButton}
              >
                <div style={styles.categoryCircle}>
                  {category.icon}
                </div>

                <span style={styles.categoryText}>
                  {category.label
                    .split("\n")
                    .map((line, index) => (
                      <span key={index}>
                        {line}
                        {index === 0 &&
                          category.label.includes("\n") && (
                            <br />
                          )}
                      </span>
                    ))}
                </span>
              </button>
            ))}
          </div>

          {/* RESTAURANTE */}
          <section style={styles.restaurantCard}>

            <div style={styles.restaurantImageContainer}>
              <img
                src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=85"
                alt="Prato de massa italiana"
                style={styles.restaurantImage}
              />

              <div style={styles.trendingBadge}>
                Em Alta perto de você
              </div>
            </div>

            <div style={styles.restaurantInfo}>

              <div style={styles.restaurantHeader}>
                <h2 style={styles.restaurantName}>
                  La Rustica
                </h2>

                <div style={styles.rating}>
                  <span>4.8</span>
                  <span style={styles.star}>★</span>
                </div>
              </div>

              <div style={styles.restaurantDetails}>
                Italiano&nbsp; • &nbsp;5 min a pé&nbsp; • &nbsp;$$$$
              </div>

            </div>
          </section>

          {/* FILTRO */}
          <section style={styles.filterSection}>

            <h2 style={styles.sectionTitle}>
              Filtro por Culinária
            </h2>

            <div style={styles.filterList}>
              {filters.map((filter) => {
                const isActive =
                  activeFilter === filter;

                return (
                  <button
                    key={filter}
                    onClick={() =>
                      setActiveFilter(filter)
                    }
                    style={{
                      ...styles.filterButton,

                      ...(isActive
                        ? styles.filterButtonActive
                        : {}),
                    }}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

          </section>

        </main>

        {/* NAVEGAÇÃO INFERIOR */}
        <nav style={styles.bottomNavigation}>
          {navigation.map((item) => {
            const isActive =
              activeTab === item.label;

            return (
              <button
                key={item.label}
                onClick={() =>
                  setActiveTab(item.label)
                }
                style={{
                  ...styles.navButton,

                  color: isActive
                    ? COLORS.terracotta
                    : COLORS.muted,
                }}
              >
                <span
                  style={{
                    ...styles.navIcon,
                    fontWeight: isActive
                      ? "700"
                      : "400",
                  }}
                >
                  {item.icon}
                </span>

                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* HOME INDICATOR */}
        <div style={styles.homeIndicator} />

      </div>
    </div>
  );
}

/* =====================================================
   ESTILOS
===================================================== */

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "radial-gradient(circle at center, #ffffff 0%, #eeeeee 100%)",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
    boxSizing: "border-box",
    padding: "30px",
  },

  phone: {
    width: "390px",
    height: "844px",
    position: "relative",
    overflow: "hidden",
    background: COLORS.background,
    borderRadius: "45px",
    border: "8px solid #171917",
    boxShadow:
      "0 25px 70px rgba(0,0,0,.20)",
    boxSizing: "border-box",
  },

  content: {
    height: "calc(100% - 105px)",
    overflowY: "auto",
    overflowX: "hidden",
    paddingBottom: "30px",
    scrollbarWidth: "none",
  },

  statusBar: {
    height: "42px",
    padding: "10px 18px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#111",
    fontSize: "13px",
    boxSizing: "border-box",
  },

  statusRight: {
    display: "flex",
    gap: "7px",
    alignItems: "center",
    fontSize: "9px",
  },

  searchRow: {
    display: "flex",
    gap: "8px",
    padding: "12px 14px 8px",
  },

  searchBox: {
    flex: 1,
    height: "42px",
    display: "flex",
    alignItems: "center",
    background: COLORS.white,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "10px",
    padding: "0 10px",
    boxSizing: "border-box",
  },

  searchIcon: {
    fontSize: "25px",
    color: COLORS.muted,
    marginRight: "6px",
  },

  searchInput: {
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    color: COLORS.graphite,
    fontSize: "13px",
  },

  settingsButton: {
    width: "42px",
    height: "42px",
    borderRadius: "10px",
    border: `1px solid ${COLORS.border}`,
    background: COLORS.white,
    fontSize: "22px",
    color: COLORS.graphite,
    cursor: "pointer",
  },

  categoryContainer: {
    display: "flex",
    gap: "10px",
    padding: "8px 14px 13px",
    overflowX: "auto",
    scrollbarWidth: "none",
  },

  categoryButton: {
    minWidth: "53px",
    border: "none",
    background: "transparent",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: COLORS.graphite,
    cursor: "pointer",
    padding: 0,
  },

  categoryCircle: {
    width: "43px",
    height: "43px",
    borderRadius: "50%",
    background: COLORS.lightSage,
    border: "1px solid #D5E0D9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    marginBottom: "5px",
  },

  categoryText: {
    fontSize: "10px",
    lineHeight: "11px",
    textAlign: "center",
    whiteSpace: "nowrap",
  },

  restaurantCard: {
    margin: "0 14px",
    background: COLORS.white,
    borderRadius: "13px",
    overflow: "hidden",
    border: "1px solid #E6E6E3",
    boxShadow:
      "0 4px 14px rgba(0,0,0,.08)",
  },

  restaurantImageContainer: {
    height: "200px",
    position: "relative",
    overflow: "hidden",
  },

  restaurantImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  trendingBadge: {
    position: "absolute",
    top: "9px",
    left: "9px",
    background: "rgba(255,255,255,.93)",
    borderRadius: "6px",
    padding: "6px 9px",
    fontSize: "12px",
    fontWeight: "600",
  },

  restaurantInfo: {
    padding: "10px 10px 12px",
  },

  restaurantHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  restaurantName: {
    margin: 0,
    fontSize: "17px",
    fontWeight: "750",
    color: COLORS.graphite,
  },

  rating: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "13px",
  },

  star: {
    color: "#D59C21",
    fontSize: "14px",
  },

  restaurantDetails: {
    marginTop: "4px",
    color: COLORS.muted,
    fontSize: "11px",
  },

  filterSection: {
    padding: "21px 14px 85px",
  },

  sectionTitle: {
    margin: "0 0 11px",
    fontSize: "18px",
    fontWeight: "750",
    color: COLORS.graphite,
  },

  filterList: {
    display: "flex",
    gap: "7px",
    overflowX: "auto",
    scrollbarWidth: "none",
  },

  filterButton: {
    minWidth: "max-content",
    padding: "11px 12px",
    borderRadius: "11px",
    border: `1px solid ${COLORS.border}`,
    background: "#F3F3EE",
    color: COLORS.graphite,
    fontSize: "12px",
    cursor: "pointer",
    transition: "all .2s ease",
  },

  filterButtonActive: {
    background: COLORS.terracotta,
    borderColor: COLORS.terracotta,
    color: "#FFFFFF",
    boxShadow:
      "0 4px 10px rgba(224,90,71,.25)",
  },

  bottomNavigation: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "67px",
    display: "flex",
    background: "rgba(255,255,255,.97)",
    borderTop: "1px solid #DEDFDC",
    padding: "5px 4px 5px",
    boxSizing: "border-box",
  },

  navButton: {
    flex: 1,
    border: "none",
    background: "transparent",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "3px",
    fontSize: "10px",
    cursor: "pointer",
  },

  navIcon: {
    fontSize: "21px",
    lineHeight: "20px",
  },

  homeIndicator: {
    position: "absolute",
    bottom: "5px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "120px",
    height: "4px",
    borderRadius: "10px",
    background: "#111",
  },
};

export default App;