import React, { Component } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Emitter from "@/components/utility/emitter";
import * as Constants from "@/components/utility/constants";
import LabeledField from "@/components/uicustom/labeledfield";
import { Input } from "@/components/ui/input"

class TabCamera extends Component {

    handleClickCameraUpdate() {
        console.log("handleClickCameraUpdate")
        Emitter.emit(Constants.EVENT_CAMERA_UPDATE, {});
        Emitter.emit(Constants.EVENT_WRITE_FROM_UI_TO_URL, {});    
    }

    render() {
        return (
            <div className="flex flex-col h-full">
                <div className="p-2 bg-secondary">
                    <Button className="w-full" onClick={this.handleClickCameraUpdate}>update</Button>
                </div>
                <ScrollArea className="flex-1 overflow-y-auto">
                    <div className="pl-2 pr-4 pb-2">
                        <Accordion type="multiple" className="w-full" collapsible="true"
                            defaultValue={["controls"]}
                        >
                            <AccordionItem value="controls">
                                <AccordionTrigger>Controls</AccordionTrigger>
                                <AccordionContent>
                                    <LabeledField
                                        name="UI_STATE_CAMERA_CONTROLS_ROTATESPEED"
                                        labelText={"rotation speed"}
                                    />
                                    <LabeledField
                                        name="UI_STATE_CAMERA_CONTROLS_PANSPEED"
                                        labelText={"pan speed"}
                                    />
                                    <LabeledField
                                        name="UI_STATE_CAMERA_CONTROLS_ZOOMSPEED"
                                        labelText={"zoom speed"}
                                    />
                                    <LabeledField
                                        name="UI_STATE_CAMERA_NEAR"
                                        labelText={"min distance"}
                                    />
                                    <LabeledField
                                        name="UI_STATE_CAMERA_FAR"
                                        labelText={"far distance"}
                                    />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </ScrollArea>
            </div>
        )
    }

}

export default TabCamera
