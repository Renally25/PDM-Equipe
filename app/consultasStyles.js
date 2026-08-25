import { StyleSheet } from "react-native";

const colors = {
  background: "#D5CDB8",
  darkGreen: "#3B4231",
  textDark: "#2B2B2B",
  muted: "#656C47",
  white: "#FFFFFF",
  selected: "#8B9174",
  enphasisGreen: "#3B4231",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 32,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 28,
    marginTop: 30,
  },
  title: {
    color: colors.textDark,
    fontSize: 25,
    fontWeight: "700",
  },
  cartaoConsulta: {
    backgroundColor: colors.darkGreen,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 24,
  },
  rotuloConsulta: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 13,
    marginBottom: 4,
  },
  valorConsulta: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "700",
  },
  monthHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  monthTitle: {
    color: colors.darkGreen,
    fontSize: 19,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  calendar: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  weekDay: {
    width: "14.2857%",
    textAlign: "center",
    color: colors.muted,
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 8,
  },
  dayCell: {
    width: "14.2857%",
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderRadius: 12,
  },
  selectedDay: {
    backgroundColor: colors.selected,
  },
  dayNumber: {
    color: colors.textDark,
    fontSize: 15,
  },
  otherMonthText: {
    color: colors.muted,
  },
  todayText: {
    fontWeight: "700",
    color: colors.darkGreen,
  },
  todayMark: {
    position: "absolute",
    top: 7,
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.darkGreen,
  },
  eventDot: {
    position: "absolute",
    bottom: 7,
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.darkGreen,
  },
  selectedDate: {
    color: colors.textDark,
    fontSize: 19,
    fontWeight: "700",
    marginTop: 28,
    marginBottom: 14,
    textTransform: "capitalize",
  },
  sectionTitle: {
    color: colors.textDark,
    fontSize: 19,
    fontWeight: "700",
    marginTop: 26,
    marginBottom: 14,
  },
  fieldLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
  },
  selectionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 18,
  },
  selectionButton: {
    borderWidth: 1,
    borderColor: colors.muted,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  selectionButtonSelected: {
    backgroundColor: colors.darkGreen,
    borderColor: colors.darkGreen,
  },
  selectionButtonText: {
    color: colors.textDark,
    fontSize: 13,
  },
  selectionButtonTextSelected: {
    color: colors.white,
    fontWeight: "700",
  },
  scheduleButton: {
    alignItems: "center",
    backgroundColor: colors.darkGreen,
    borderRadius: 12,
    marginTop: 4,
    marginBottom: 24,
    paddingVertical: 14,
  },
  scheduleButtonDisabled: {
    opacity: 0.45,
  },
  scheduleButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.45)",
    padding: 20,
  },
  confirmationModal: {
    width: "100%",
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 22,
  },
  modalTitle: {
    color: colors.textDark,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  modalText: {
    color: colors.textDark,
    fontSize: 15,
    marginBottom: 8,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 18,
  },
  cancelButton: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  cancelButtonText: {
    color: colors.darkGreen,
    fontWeight: "700",
  },
  confirmButton: {
    backgroundColor: colors.darkGreen,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  confirmButtonText: {
    color: colors.white,
    fontWeight: "700",
  },
  message: { color: colors.muted, fontSize: 14, paddingVertical: 14 },
  eventCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  eventIcon: {
    backgroundColor: colors.background,
    borderRadius: 9,
    padding: 9,
    marginRight: 12,
  },
  eventTitle: { color: colors.textDark, fontSize: 15, fontWeight: "700" },
  eventTime: { color: colors.muted, fontSize: 13, marginTop: 4 },
});

export default { ...styles, colors };
