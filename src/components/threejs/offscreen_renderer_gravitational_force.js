import * as THREE from "three";
import { vec3 } from "gl-matrix/esm";
import { OffscreenRenderer } from "@/components/threejs/offscreen_renderer"

const glsl = x => x[0];
/**
 * TODO
 * The resulting texture stores force vector and magnitude:
 * 
 * size 1*domain_pixel_x, 1*domain_pixel_y
 * 
 * --> 1 vec4 per grid node
 * 
 * 1. vec4: 2 floats for direction of force
 *          1 float padding
 *          1 float magnitude of direction
 */
class OffscreenRendererGravitationalForce extends OffscreenRenderer {

    constructor(renderer, simulationParameters, useAnglePlane) {
        super(renderer, simulationParameters, useAnglePlane)
    }

    link(offscreenRendererSeedsAndReturns){
        this.offscreenRendererSeedsAndReturns = offscreenRendererSeedsAndReturns;
    }

    getNumPixelsPerNodeX() {
        return 1;
    }

    getNumPixelsPerNodeY() {
        return 1;
    }

    addAdditionalUniforms() {
        //this.uniforms["texture_seeds"] = { type: 'sampler3D', value: this.offscreenRendererSeeds.renderTarget.texture};
        this.uniforms["texture_seeds_and_returns"] = { type: 'sampler3D', value: this.offscreenRendererSeedsAndReturns.renderTarget.texture};

    }

    setAdditionalUniforms() {
        //this.dummy_plane_mesh.material.uniforms.texture_seeds.value = this.offscreenRendererSeeds.renderTarget.texture;
        this.dummy_plane_mesh.material.uniforms.texture_seeds_and_returns.value = this.offscreenRendererSeedsAndReturns.renderTarget.texture;   
        
    }

    fragmentShaderMethodComputation() {
        return glsl`            

            //renaming for convenience
            float x1 = primary_x;
            float x2 = secondary_x;
            float m1 = primary_mass;
            float m2 = secondary_mass;

            ivec3 pointer = ivec3(x_pixel_mod, y_pixel_mod, 0);
            vec2 seed_position = texelFetch(texture_seeds_and_returns, pointer, 0).xy;
            float x = seed_position.x;
            float y = seed_position.y;
            vec2 primary_position = vec2(x1, 0.0);
            vec2 secondary_position = vec2(x2, 0.0);

            float r1 = distance(seed_position, primary_position);
            float r2 = distance(seed_position, secondary_position);
            float r13 = r1*r1*r1;
            float r23 = r2*r2*r2;

            vec2 F1 = G * m1 / r13 * vec2(x1-x, -y);//y1=0 per definition
            vec2 F2 = G * m2 / r23 * vec2(x2-x, -y);//y2=0 per definition
            vec2 F = F1 + F2;
            float force_magnitude = length(F);

            outputColor = vec4(F.x, F.y, 0.0, force_magnitude);
        `
    }

}

export { OffscreenRendererGravitationalForce }