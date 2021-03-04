import { store, configStore } from "../../store";

export const commonMethods = {
	onFocus(e) {
		this.$emit("focus", e);
	},
	onBlur(e) {
		this.$emit("blur", e);
	},
	input(val) {
		this.onInput(val);
	},
	
	clear() {
		this.setValue("");
		this.$nextTick(function () {
			this.$refs.input.resetValidation();
		});
	},
  
	getStoreValue() {
		let res;
		if (this.rest.multiKey)
			res = store.getValueByKey(
				this.rest.key,
				this.rest.multiKey,
				this.rest.multiIndex
			);
		else res = store.getValueByKey(this.rest.key);
		return res;
	},
	setConfig(arg1 = "", arg2) {
		if (arguments.length === 2) {
			// Case 2 arg
			if (arg1) this.storeConfig({ [arg1]: arg2 });
			else console.log("WARNING! No name provided!");
		} else if (arguments.length === 1) {
			// Case 1 arg
			if (arg1 && typeof arg1 === "object") this.storeConfig(arg1);
			else console.log("WARNING! No value object provided!");
		}
	},

}

export const methods = {

	onInput(val) {
		this.storeValue(val);
		this.$emit("input", val);
	},

	reset() {
		this.setConfig(this.archiveRest);
		this.setValue(this.archiveRest.value);
		this.$nextTick(function () {
			this.$refs.input?.resetValidation?.();
		});
	},


	// Store actions
	storeValue(val) {
		if (this.rest.multiKey)
			store.updateKeyValue(
				this.rest.key,
				val,
				this.rest.multiKey,
				this.rest.multiIndex
			);
		else store.updateKeyValue(this.rest.key, val);
		this.value = this.getStoreValue();
	},
	storeConfig(obj) {
		if (this.rest.multiKey) {
			configStore.set(
				this.rest.key,
				obj,
				this.rest.multiKey,
				this.rest.multiIndex
			);
			this.$parent.rest = configStore.get(
				this.rest.key,
				this.rest.multiKey,
				this.rest.multiIndex
			);
		} else {
			configStore.set(this.rest.key, obj);
			this.$parent.rest = configStore.get(this.rest.key);
		}
	},
	setValue(val) { // candidate to common
		this.storeValue(val);
	},
}

export const stringRules = () => {

}

export const watchers = {

  "store.state.watcher": function () {
    const val = this.getStoreValue();
    if (val !== this.value) {
      this.value = val;
    }
  },
  "this.rest.visible": function () {
    if (this.rest.hasOwnProperty("visible") && !this.rest.visible) {
      this.$parent.$el.parentNode.className += " hidden";
    }
  },
}

export const mountedCommon = (vThis) => {
  vThis.validate = vThis.$refs.input.validate;
  if (vThis.rest.hasOwnProperty("visible") && !vThis.rest.visible) {
    vThis.$parent.$el.parentNode.className += " hidden";
  }
}