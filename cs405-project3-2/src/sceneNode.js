/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }


    draw(mvp, modelView, normalMatrix, modelMatrix) {
        // 1. TRS matrisini al
        var localTransform = this.trs.getTransformationMatrix();
    
        // 2. Şu anki düğümün model matrisini hesapla
        var newModelMatrix = MatrixMult(modelMatrix, localTransform);
    
        // 3. Model-View matrisini güncelle
        var newModelViewMatrix = MatrixMult(modelView, localTransform);
    
        // 4. Normal matrisini güncelle
        var newNormalMatrix = getNormalMatrix(newModelMatrix);
    
        // 5. MVP (Model-View-Projection) matrisini güncelle
        var newMvpMatrix = MatrixMult(mvp, localTransform);
    
        // 6. Bu düğümün mesh'ini çiz
        if (this.meshDrawer) {
            this.meshDrawer.draw(newMvpMatrix, newModelViewMatrix, newNormalMatrix, newModelMatrix);
        }
    
        // 7. Çocuk düğümleri çiz
        for (let child of this.children) {
            child.draw(newMvpMatrix, newModelViewMatrix, newNormalMatrix, newModelMatrix);
        }
    }
    
    
    

    

}